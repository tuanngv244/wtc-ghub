"use client";

import { ReactNode, useRef, useEffect } from "react";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import { Splide as SplideCore } from "@splidejs/splide";
import { ControlSlider } from "./control-slider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import type { Options } from "@splidejs/splide";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/use-ui-store";

/* =================================================================
   BoxSlider — Splide carousel with GSAP ScrollTrigger entrance.

   Staggered slide-in animation triggers when the section scrolls
   into view inside the .main-wrapper scroll container.
   ================================================================= */

export interface BoxSliderProps<T> {
  title: string | ReactNode;
  handBrush?: ReactNode;
  data: T[];
  renderItem?: (data: T, index: number) => ReactNode;
  onViewAll?: VoidFunction;
  options?: Options;
  className?: string;
  hasViewAll?: boolean;
  rightAction?: ReactNode;
  /** When true, delays entrance animation until loading screen finishes.
   *  Use for sections visible above the fold (OurTopPicked, BestIOGames, etc.) */
  waitForLoading?: boolean;
}

export function BoxSlider<T>({
  title,
  handBrush,
  data = [],
  renderItem,
  onViewAll,
  className = "box-slider",
  hasViewAll = true,
  rightAction,
  waitForLoading = false,
  options,
}: BoxSliderProps<T>) {
  const splideRef = useRef<SplideCore | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoadingDone = useUIStore((s) => s.isLoadingDone);

  const initialOptions = {
    rewind: true,
    gap: "1.5rem",
    perPage: 6,
    perMove: 1,
    type: "slide",
    arrows: false,
    pagination: false,
    autoHeight: true,
    breakpoints: {
      1560: {
        perPage: 6,
      },
      1024: {
        perPage: 4,
      },
      768: {
        perPage: 3,
      },
      640: {
        perPage: 1,
      },
    },
  };

  const configOptions = Object.assign(initialOptions, options);

  /* ── Hide slides immediately for waitForLoading sections ── */
  useEffect(() => {
    if (!waitForLoading) return;

    const container = containerRef.current;
    if (!container) return;

    const allSlides = container.querySelectorAll(".splide__slide");
    if (!allSlides.length) return;

    gsap.set(allSlides, { opacity: 0 });
  }, [waitForLoading, data.length]);

  /* ── GSAP staggered entrance animation ────────────────── */
  useEffect(() => {
    /* For above-the-fold sections, wait until loading screen finishes */
    if (waitForLoading && !isLoadingDone) return;

    const container = containerRef.current;
    if (!container) return;

    /* Find the .main-wrapper scroll container for ScrollTrigger.
       The app uses a custom scrollable div (.main-wrapper) instead
       of the viewport, so ScrollTrigger needs to know about it. */
    const scroller = document.querySelector(".main-wrapper");

    const ctx = gsap.context(() => {
      /* Animate real slides with stagger; reveal clones instantly with them */
      const allSlides = container.querySelectorAll(".splide__slide");
      const realSlides = container.querySelectorAll(
        ".splide__slide:not(.splide__slide--clone)",
      );
      const cloneSlides = container.querySelectorAll(".splide__slide--clone");
      if (!realSlides.length) return;

      /* Real slides start offset to the right; clones just hidden */
      gsap.set(realSlides, { opacity: 0, x: 40 });
      gsap.set(cloneSlides, { opacity: 0 });

      if (waitForLoading) {
        /* Above-fold sections: play directly after a short delay
           to allow the loading screen exit animation to finish.
           setLoadingDone() fires 0.7s before exit completes. */
        gsap.to(realSlides, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.12,
          delay: 0.8,
        });

        if (cloneSlides.length) {
          gsap.to(cloneSlides, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            delay: 0.8,
          });
        }
      } else {
        /* Below-fold sections: use ScrollTrigger */
        gsap.to(realSlides, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            once: true,
            ...(scroller ? { scroller } : {}),
          },
        });

        if (cloneSlides.length) {
          gsap.to(cloneSlides, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              once: true,
              ...(scroller ? { scroller } : {}),
            },
          });
        }
      }
    }, container);

    return () => ctx.revert();
  }, [data.length, waitForLoading, isLoadingDone]);

  const onPrev = () => {
    splideRef.current!.go("<");
  };
  const onNext = () => {
    splideRef.current!.go(">");
  };

  return (
    <div ref={containerRef} className={cn("flex flex-col", className)}>
      <div className="relative heading py-4 flex items-center justify-between gap-2 min-w-0">
        {typeof title === "string" ? (
          <h3 className="relative z-2 text-base sm:text-2xl leading-6 sm:leading-7 font-bold text-text-primary [font-family:var(--font-pp-pangram)] flex-1 min-w-0">
            {title}
          </h3>
        ) : (
          title
        )}
        {handBrush && handBrush}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap justify-end">
          {rightAction}
          {hasViewAll && (
            <p
              onClick={onViewAll}
              className="cursor-pointer inline-block text-sm leading-4 font-bold text-text-primary underline [font-family:var(--font-pp-pangram)]"
            >
              View all
            </p>
          )}
          <ControlSlider onNext={onNext} onPrev={onPrev} />
        </div>
      </div>
      <div className="list">
        <Splide hasTrack={false} ref={splideRef} options={configOptions}>
          <SplideTrack>
            {data.map((item, index) => (
              <SplideSlide key={index}>
                {renderItem && renderItem(item, index)}
              </SplideSlide>
            ))}
          </SplideTrack>
        </Splide>
      </div>
    </div>
  );
}
