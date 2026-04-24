"use client";

import { cn } from "@/lib/utils";
import { SVG } from "./svgs";

/* =================================================================
   ControlSlider — Carousel prev/next navigation from Figma

   Figma: Section Container → Control (node 100:1030, 79:414)
   Buttons: ControlItem Prev (267:13840) / Next (267:13839)

   ┌──────────────────────────────────────────────┐
   │  bg: neutral-500 (#f7fbfc)                   │
   │  border: 1px solid grey-900 (#282a2e)        │
   │  rounded: full (9999px)                      │
   │  padding: 4px, gap: 2px                      │
   │                                              │
   │  ┌───────────────┐  ┌───────────────┐        │
   │  │  shadow: grey  │  │  shadow: grey  │       │
   │  │  face: neutral │  │  face: neutral │       │
   │  │      ‹        │  │       ›        │       │
   │  └───────────────┘  └───────────────┘        │
   └──────────────────────────────────────────────┘

   Each arrow button (ControlItem):
     - size: 56×36px
     - Asymmetric rounding:
       Prev → rounded-s-[14px] rounded-e-[10px]
       Next → rounded-s-[10px] rounded-e-[14px]
     - Shadow layer: grey-400 (#7f838a), 3D depth via inset offset
       Prev → inset [0 -2px -2px 0] (bottom-left depth)
       Next → inset [0 0 -2px -2px] (bottom-right depth)
     - Face layer: neutral-600 (#e1e4e5), border grey-900
     - Chevron: 12×14px, offset ~1.5px toward pointing direction
   ================================================================= */

export interface ControlSliderProps {
  onPrev?: () => void;
  onNext?: () => void;
  disabledPrev?: boolean;
  disabledNext?: boolean;
  className?: string;
}

export function ControlSlider({
  onPrev,
  onNext,
  disabledPrev = false,
  disabledNext = false,
  className,
}: ControlSliderProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center",
        "rounded-full border border-grey-900 bg-neutral-500 p-1",
        className,
      )}
    >
      {/* Previous button */}
      <button
        type="button"
        onClick={onPrev}
        disabled={disabledPrev}
        className={cn(
          "group/btn relative flex h-9 w-14 items-center justify-center drop-shadow-[1px_1px_0_var(--color-grey-900)]",
          "transition-[filter] duration-150",
          "disabled:opacity-40 disabled:pointer-events-none",
          "cursor-pointer",
          " active:drop-shadow-[0_0_0_var(--color-grey-900)]",
        )}
        aria-label="Previous"
      >
        <SVG.ArrowLeft className="absolute left-1/2 top-1/2 -translate-1/2 w-3 h-3.5" />
        <img
          src="/images/icons/prev-box.png"
          alt="prev"
          className="h-full w-full "
        />
      </button>

      {/* Next button */}
      <button
        type="button"
        onClick={onNext}
        disabled={disabledNext}
        className={cn(
          "group/btn relative flex h-9 w-14 items-center justify-center drop-shadow-[0_1px_0_var(--color-grey-900)]",
          "transition-[filter] duration-150",
          "disabled:opacity-40 disabled:pointer-events-none",
          "cursor-pointer",
          " active:drop-shadow-[0_0_0_var(--color-grey-900)]",
        )}
        aria-label="Next"
      >
        <SVG.ArrowRight className="absolute left-1/2 top-1/2 -translate-1/2 w-3 h-3.5" />
        <img
          src="/images/icons/next-box.png"
          alt="next"
          className="h-full w-full -ml-0.5"
        />
      </button>
    </div>
  );
}
