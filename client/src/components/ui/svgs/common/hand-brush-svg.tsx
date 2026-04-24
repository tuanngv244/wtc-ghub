"use client";

import { useRef, useEffect, useState, type SVGProps } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* =================================================================
   HandBrushSvg — loads an SVG file, injects paths inline, and
   animates a stroke-draw effect with GSAP. Redraws every 4s ∞.
   ================================================================= */

interface HandBrushSvgProps {
  /** Path to the SVG file in /public */
  src: string;
  /** Unique id for the SVG element */
  id: string;
  /** Default width */
  width?: number;
  /** Default height */
  height?: number;
  /** Additional className */
  className?: string;
}

interface SvgData {
  viewBox: string;
  paths: { d: string; fill: string }[];
}

export function HandBrushSvg({
  src,
  id,
  width,
  height,
  className,
  ...props
}: HandBrushSvgProps & Omit<SVGProps<SVGSVGElement>, "id">) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgData, setSvgData] = useState<SvgData | null>(null);
  const animatedRef = useRef(false);

  /* ── Fetch & parse SVG ── */
  useEffect(() => {
    let cancelled = false;

    fetch(src)
      .then((res) => res.text())
      .then((text) => {
        if (cancelled) return;

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "image/svg+xml");
        const svg = doc.querySelector("svg");
        if (!svg) return;

        const viewBox =
          svg.getAttribute("viewBox") ?? `0 0 ${width ?? 100} ${height ?? 100}`;

        const pathEls = svg.querySelectorAll("path");
        const paths: SvgData["paths"] = [];
        pathEls.forEach((p) => {
          const d = p.getAttribute("d");
          const fill = p.getAttribute("fill") || "#000";
          if (d && fill !== "none") {
            paths.push({ d, fill });
          }
        });

        setSvgData({ viewBox, paths });
      })
      .catch(() => {
        /* silently fail — decorative element */
      });

    return () => {
      cancelled = true;
    };
  }, [src, width, height]);

  /* ── GSAP stroke draw animation — infinite loop every 4s ── */
  useEffect(() => {
    if (!svgData || animatedRef.current) return;
    if (typeof window === "undefined") return;

    const el = svgRef.current;
    if (!el) return;

    const paths = el.querySelectorAll<SVGPathElement>(".hand-brush-path");
    if (!paths.length) return;

    animatedRef.current = true;

    /* Use .main-wrapper as scroll container (custom scrollable div) */
    const scroller = document.querySelector(".main-wrapper");

    const ctx = gsap.context(() => {
      /* Compute path lengths and set initial hidden state */
      const lengths: number[] = [];
      paths.forEach((path, i) => {
        const length = path.getTotalLength();
        lengths[i] = length;
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          fillOpacity: 0,
        });
      });

      /* Build a repeating timeline:
         0.0s — stroke draws in (1.2s)
         0.9s — fill fades in (0.4s, overlaps)
         1.3s — hold visible
         3.2s — fill fades out + stroke undraws (0.8s)
         4.0s — cycle repeats
      */
      const tl = gsap.timeline({
        repeat: -1,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play pause resume pause",
          ...(scroller ? { scroller } : {}),
        },
      });

      paths.forEach((path, i) => {
        const len = lengths[i];

        /* Draw stroke in */
        tl.to(
          path,
          {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power2.inOut",
          },
          0,
        );

        /* Fade fill in (overlap with stroke end) */
        tl.to(
          path,
          {
            fillOpacity: 1,
            duration: 0.4,
            ease: "power1.in",
          },
          0.9,
        );

        /* Fade fill out + undraw stroke */
        tl.to(
          path,
          {
            fillOpacity: 0,
            duration: 0.5,
            ease: "power1.out",
          },
          3.2,
        );

        tl.to(
          path,
          {
            strokeDashoffset: len,
            duration: 0.8,
            ease: "power2.inOut",
          },
          3.2,
        );
      });
    }, el);

    return () => ctx.revert();
  }, [svgData]);

  if (!svgData) {
    /* Reserve space while loading */
    return (
      <svg
        width={width}
        height={height}
        className={className}
        aria-hidden
        {...props}
      />
    );
  }

  return (
    <svg
      ref={svgRef}
      id={id}
      width={width}
      height={height}
      viewBox={svgData.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      {...props}
    >
      {svgData.paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fill={p.fill}
          stroke={p.fill}
          strokeWidth={1}
          className="hand-brush-path"
        />
      ))}
    </svg>
  );
}
