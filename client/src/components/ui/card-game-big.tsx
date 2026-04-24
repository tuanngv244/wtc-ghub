"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Button } from "./button";
import { SVG } from "./svgs";
import { ETag } from "@/types/common";
import { useGameDrawerStore } from "@/stores/use-game-drawer-store";

/* =================================================================
   OurTopicCard — Blog/Guide card from Figma (Card Blog component)

   Design anatomy (from screenshot):
   ┌─────────────────────────────────┐
   │  ┌───────────────────────────┐  │
   │  │ [Image]          [Tag]    │  │  ← rounded image with tag overlay
   │  └───────────────────────────┘  │
   │  ╔╝╔╝╔╝╔╝╔╝╔╝╔╝╔╝            │  ← spiral binder decorations
   │  ┌───────────────────────────┐  │
   │  │ Title text                │  │
   │  │ ┌─────────────────────┐   │  │
   │  │ │ DIVE IN         →   │   │  │  ← CTA button
   │  │ └─────────────────────┘   │  │
   │  └───────────────────────────┘  │
   └─────────────────────────────────┘

   Hover: Button icon changes from ··· to →
   ================================================================= */

export interface CardGameBigProps {
  title: string;
  description?: string;
  imageUrl?: string;
  tag?: ETag | "hot" | "new" | "we-loved";
  className?: string;
  countPlayer?: string;
  onView?: VoidFunction;
  onGame?: VoidFunction;
  /** Full game data for drawer preview */
  gameData?: import("@/types/game").IGame;
}

export function CardGameBig({
  title,
  imageUrl,
  className,
  description,
  tag,
  onGame,
  onView,
  countPlayer,
  gameData,
}: CardGameBigProps) {
  const { openWithGame } = useGameDrawerStore();

  const handleView = () => {
    if (onView) {
      onView();
    }
    if (gameData) {
      openWithGame(gameData);
    }
  };

  const tagRender = {
    hot: <SVG.HotTag />,
    new: <SVG.NewTag />,
    "we-loved": <SVG.WeLovedTag />,
  };

  return (
    <div
      className={cn(
        "group relative z-5 cursor-pointer isolate flex w-full flex-col border border-grey-900 gap-1.5 p-1.5 bg-white",
        "rounded-3xl",
        className,
      )}
    >
      {/* Tag */}
      {tag && (
        <div className="absolute -top-3 -right-3 z-4">{tagRender[tag]}</div>
      )}

      {/* Pattern */}
      <img
        alt="pattern"
        className="absolute bottom-0 right-0 z-1 rounded-3xl"
        src="/images/assets/pattern.png"
        width={150}
        height={150}
      />

      {/* Thumbnail */}
      <div className=" relative overflow-hidden rounded-[18px] z-3 ">
        <div className="aspect-248/178">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="pt-3 pb-9 px-5.5 flex flex-col relative z-3">
        <h5 className="text-xl leading-6 [font-family:var(--font-pp-pangram)] text-text-primary font-bold line-clamp-1">
          {title}
        </h5>
        <p className="text-sm leading-4.5 mt-0.5 text-(--color-grey-500)  [font-family:var(--font-pp-pangram)] font-medium line-clamp-2">
          {description}
        </p>
        {countPlayer && (
          <div className="flex items-center gap-1 mt-2.5">
            <SVG.User size={16} />
            <span className="text-xs leading-4 font-semibold [font-family:var(--font-pp-pangram)] text-(--color-grey-800) ">
              {countPlayer}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="absolute -bottom-4 sm:-bottom-5 right-3 sm:right-5 z-3 flex items-center justify-center gap-1.5">
        <Button
          className="transition-all duration-250 translate-y-3 opacity-0 invisible group-hover:translate-y-0 group-hover:visible group-hover:opacity-100 "
          variant="tertiary"
          shape="circle"
          onClick={handleView}
        >
          <SVG.Eye />
        </Button>
        <Button
          className="transition-all translate-y-4 opacity-0 invisible group-hover:translate-y-0 group-hover:visible group-hover:opacity-100 duration-250"
          variant="secondary"
          shape="pill-shape"
        >
          GAME ON!
        </Button>
      </div>
    </div>
  );
}
