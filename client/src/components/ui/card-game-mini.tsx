/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { SVG } from "./svgs";
import { useGameDrawerStore } from "@/stores/use-game-drawer-store";

/* =================================================================
   CardGameMini — Mini game card from Figma design system

   Figma specs (node 100:1041 "Card Container"):
   ┌───────────────────────────────────┐
   │  ┌───────────────────────────┐    │
   │  │        [Image]            │    │  ← 18px rounded, 1px border
   │  │    aspect 248 / 120       │    │
   │  └───────────────────────────┘    │
   │  Title                            │  ← 14px bold, -0.28px tracking
   └───────────────────────────────────┘

   Card:
     - bg: white
     - border: 1px solid grey-900 (#282a2e)
     - rounded: 24px (3xl)
     - padding: 6px
     - gap: 6px

   Thumb: 18px rounded, 1px border grey-900, overflow clip

   Hover CTA overlay (on image):
     - View: 40×40 circle, sky-blue-500 face, #7da4e7 shadow, #2a63c6 border
     - GAME ON!: pill h-40, green-500 face, green-700 shadow, green-800 border
     - Both use 3D shadow/face layer pattern (2px bottom-right offset)
   ================================================================= */

export interface CardGameMiniProps {
  title?: string;
  imageUrl: string;
  badge?: "hot" | "new" | "we-loveddd";
  href?: string;
  className?: string;
  onView?: VoidFunction;
  onGame?: VoidFunction;
  gameData?: import("@/types/game").GameResponse;

  // Special version //
  isCardTitleOutside?: boolean;
}

export function CardGameMini({
  title,
  imageUrl,
  badge,
  href = "#",
  className,
  onView,
  onGame,
  gameData,
  isCardTitleOutside,
}: CardGameMiniProps) {
  const { openWithGame } = useGameDrawerStore();

  const handleView = () => {
    if (onView) {
      onView();
    }
    if (gameData) {
      openWithGame(gameData);
    }
  };

  //
  return (
    <div
      className={cn(
        "group relative z-5 cursor-pointer isolate flex w-full flex-col gap-1.5 p-1.5 bg-white",
        "rounded-3xl transition-transform origin-left duration-200",
        "after:content-[''] after:opacity-0 after:w-full after:rounded-3xl after:transition after:h-full after:origin-left after:absolute after:-z-10 after:bottom-0 after:left-0 after:bg-[linear-gradient(245deg,var(--color-grey-50)_-0.04%,var(--color-grey-200)_99.96%)]",
        "before:absolute before:content-['']  before:border before:border-grey-900 before:w-full before:h-full before:top-0 before:left-0 before:bg-white  before:-z-5 before:rounded-3xl",
        isCardTitleOutside
          ? ""
          : " hover:-rotate-3 hover:after:opacity-100 hover:after:visible hover:after:rotate-3",
        className,
      )}
    >
      {/* Pattern */}
      {!isCardTitleOutside && (
        <img
          alt="pattern"
          className="absolute bottom-0 right-0 z-1 rounded-3xl"
          src="/images/assets/pattern.png"
          width={150}
          height={150}
        />
      )}
      {/* Thumbnail */}
      <div className=" relative overflow-hidden rounded-[18px] z-3 border border-grey-900">
        <div className="absolute w-full h-full top-0 left-0 z-1 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        <div
          className={isCardTitleOutside ? "aspect-180/87" : "aspect-248/120"}
        >
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover object-top"
          />
        </div>
        <div className="absolute w-full h-full top-0 left-0 opacity-0 z-2 invisible group-hover:opacity-100 group-hover:visible transition-[opacity,visibility] duration-200 flex items-center justify-center gap-1.5">
          <Button variant="tertiary" shape="circle" onClick={handleView}>
            <SVG.Eye />
          </Button>
          <Button variant="secondary" shape="pill-shape" onClick={onGame}>
            GAME ON!
          </Button>
        </div>
      </div>
      {title && (
        <div className="py-2.5 px-1.5 relative z-3">
          <h5 className="text-xl leading-6 text-text-primary font-pangram font-bold line-clamp-1">
            {title}
          </h5>
        </div>
      )}
    </div>
  );
}
