"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import Lottie from "lottie-react";
import { useUIStore } from "@/stores/use-ui-store";
import { PageTransition } from "../ui/page-transition";

/* =================================================================
   LoadingScreen — full-page intro loader.

   Centre: Lottie animation from /lotties/loading.

   Background: 5 equal-width vertical columns.
   Exit anim: columns 1, 3, 5 clip-path bottom→up;
              columns 2, 4 clip-path top→down.
   ================================================================= */

const LOTTIE_ID = "loading-screen";

export function LoadingScreen() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathsRef = useRef<SVGPathElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDone, setIsDone] = useState(false);
  const [animationData, setAnimationData] = useState<object | null>(null);
  const setLoadingDone = useUIStore((s) => s.setLoadingDone);

  useEffect(() => {
    /* ── Load Lottie JSON at runtime (no extension file) ── */
    fetch("/lotties/loading")
      .then((res) => res.json())
      .then((data: object) => setAnimationData(data))
      .catch(() => {
        /* If lottie fails to load, trigger exit immediately */
        setIsDone(true);
        setLoadingDone();
      });

    /* ── Load page transition svgs ── */
    if (!svgRef.current) return;
    pathsRef.current = Array.from(svgRef.current.querySelectorAll("path"));
    pathsRef.current.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    });
  }, []);

  /* ── Exit animation after Lottie plays ── */
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || !animationData) return;

    // const columns = container.querySelectorAll<HTMLDivElement>(".loading-col");
    const centreContent =
      container.querySelector<HTMLDivElement>(".loading-centre");

    const ctx = gsap.context(() => {
      /* Let lottie play a bit, then trigger exit after 2.5s */
      gsap.delayedCall(2.5, () => {
        const exitTl = gsap.timeline({
          onComplete: () => {
            setIsDone(true);
          },
        });

        /* Fade centre content first */
        if (centreContent) {
          exitTl.to(centreContent, {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            ease: "power2.in",
          });
        }

        /* Columns exit: odd (0,2,4) bottom→up, even (1,3) top→down */
        // columns.forEach((col, i) => {
        //   const isOdd = i % 2 === 0; // columns 0,2,4 = bottom→up
        //   exitTl.to(
        //     col,
        //     {
        //       clipPath: isOdd
        //         ? "inset(0 0 100% 0)" // bottom→up: clip from bottom
        //         : "inset(100% 0 0 0)", // top→down: clip from top
        //       duration: 0.5,
        //       ease: "power3.inOut",
        //     },
        //     "<0.06",
        //   );
        // });

        pathsRef.current.forEach((path) => {
          exitTl.to(
            path,
            {
              strokeDashoffset: 0,
              attr: {
                "stroke-width": 700,
              },
              duration: 1,
              ease: "power1.inOut",
            },
            0,
          );
        });

        const totalDuration = exitTl.duration();
        exitTl.call(
          () => {
            setLoadingDone();
          },
          undefined,
          totalDuration - 0.7,
        );
      });
    }, container);

    return () => ctx.revert();
  }, [animationData]);

  /* ── Remove from DOM after exit animation ── */
  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 pointer-events-auto bg-[#F7FBFC] overflow-hidden"
      aria-hidden
      id="loading-screen"
    >
      <PageTransition
        ref={svgRef}
        // stroke2Color="var(--color-grey-900)"
      />

      {/* Centre content — Lottie animation */}
      <div className="loading-centre absolute inset-0 flex items-center justify-center z-10">
        {animationData && (
          <div className="w-full h-full">
            <Lottie
              animationData={animationData}
              id={LOTTIE_ID}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
