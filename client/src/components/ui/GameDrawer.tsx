"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { SVG } from "./svgs";
import { useGameDrawerStore } from "@/stores/use-game-drawer-store";
import { Chip } from "./chip";
import { Button } from "./button";

/* =================================================================
   GameDrawer — Right-side panel showing game details.

   GSAP Animation:
   - Open:  overlay fades in, drawer slides from right + scales up
   - Close: drawer slides out + scales down, overlay fades out
   ================================================================= */

export interface GameDrawerProps {}

export function GameDrawer({}: GameDrawerProps) {
  const { isOpen, data, close } = useGameDrawerStore();
  const {
    thumbnailUrl,
    name,
    shortDesc,
    minAge,
    maxPlayers,
    avgDurationMin,
    minPlayers,
    difficulty,
  } = data || {};

  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const onGame = () => {};

  /* ── GSAP open / close animation ────────────────── */
  const animateOpen = useCallback(() => {
    setIsVisible(true);

    // Wait for next frame so DOM is rendered
    requestAnimationFrame(() => {
      const overlay = overlayRef.current;
      const content = contentRef.current;
      if (!overlay || !content) return;

      // Kill any running timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const tl = gsap.timeline();
      timelineRef.current = tl;

      // Set initial state
      gsap.set(overlay, { opacity: 0 });
      gsap.set(content, { x: 80, opacity: 0, scale: 0.95 });

      // Animate in
      tl.to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      tl.to(
        content,
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "back.out(1.2)",
        },
        "<0.1",
      );

      // Stagger children elements inside drawer
      const children = content.querySelectorAll(".drawer-section");
      if (children.length) {
        gsap.set(children, { y: 20, opacity: 0 });
        tl.to(
          children,
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            stagger: 0.06,
            ease: "power2.out",
          },
          "-=0.2",
        );
      }
    });
  }, []);

  const animateClose = useCallback(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;

    // Kill any running timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
      },
    });
    timelineRef.current = tl;

    tl.to(content, {
      x: 80,
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
    });

    tl.to(
      overlay,
      {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      },
      "<0.05",
    );
  }, []);

  useEffect(() => {
    if (isOpen) {
      animateOpen();
    } else if (isVisible) {
      animateClose();
    } else {
      setReadMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  /* Cleanup on unmount */
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  // Don't render anything if not visible
  if (!isVisible && !isOpen) return null;

  return (
    <div ref={drawerRef} className="fixed inset-0 z-100">
      {/* Overlay / backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/40 cursor-pointer"
        onClick={close}
        style={{ opacity: 0 }}
      />

      {/* Drawer panel */}
      <div
        ref={contentRef}
        className={cn(
          "absolute bottom-10 right-15 w-94 flex flex-col rounded-4xl overflow-hidden",
          "border-2 border-solid border-[#302F2B] bg-white",
          "max-h-[calc(100vh-2.5rem)]",
        )}
        style={{ opacity: 0, transform: "translateX(80px) scale(0.95)" }}
      >
        {/* header */}
        <div className="border-b-2 border-solid border-[#302F2B] flex items-end justify-end py-2.5 px-3.5 bg-[#8AB5FE]">
          <div className="flex items-end justify-end gap-2">
            <button
              className={cn(
                "w-8 h-8 cursor-pointer drop-shadow-[0_2px_0_rgba(0,0,0,0.25)] rounded-full bg-white flex items-center justify-center",
                "active:drop-shadow-[0_0_0_rgba(0,0,0,0.25)]",
              )}
            >
              <SVG.ArrowLeft />
            </button>
            <button
              className={cn(
                "w-8 h-8 cursor-pointer drop-shadow-[0_2px_0_rgba(0,0,0,0.25)] rounded-full bg-white flex items-center justify-center",
                "active:drop-shadow-[0_0_0_rgba(0,0,0,0.25)]",
              )}
            >
              <SVG.ArrowRight />
            </button>
            <button
              onClick={close}
              className={cn(
                "w-8 h-8 cursor-pointer drop-shadow-[0_2px_0_rgba(0,0,0,0.25)] rounded-full bg-orange-500 flex items-center justify-center",
                "active:drop-shadow-[0_0_0_rgba(0,0,0,0.25)]",
              )}
            >
              <SVG.Close size={16} className="orange-500" />
            </button>
          </div>
        </div>

        {/* scrollable content */}
        <div className="overflow-y-auto overflow-x-hidden flex-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* main image */}
          <div className="drawer-section p-3 flex flex-col">
            <div className="overflow-hidden border border-solid border-(--color-grey-900) rounded-[18px]">
              <img
                src={thumbnailUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* content */}
          <div className="drawer-section flex flex-col mt-1.5 gap-3 px-6">
            <h4 className="font-pangram text-2xl leading-7 text-grey-900 font-bold">
              {name}
            </h4>
            {difficulty && (
              <div className="flex items-center gap-2">
                <Chip>{difficulty}</Chip>
              </div>
            )}
            <p
              className={cn(
                "font-pangram text-base leading-5 font-medium text-grey-500 line-clamp-4 h-20 transition-all duration-200",
                readMore ? "line-clamp-none overflow-y-auto h-32" : "",
              )}
            >
              {shortDesc}
            </p>
            <p
              className="cursor-pointer text-xs font-pangram leading-3 text-grey-800 font-semibold text-right underline transition-all duration-150"
              onClick={() => {
                setReadMore((prev) => !prev);
              }}
            >
              Read more
            </p>
          </div>

          {/* general info */}
          <div className="drawer-section w-full justify-between border-t border-dashed border-grey-500 flex items-center gap-6 px-6 py-5 mt-4">
            <div className="flex flex-1 flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-1.5">
                <SVG.User size={12} />
                <span className="text-base leading-4 text-grey-800 font-bold font-pangram">
                  {minPlayers}-{maxPlayers}
                </span>
              </div>
              <p className="font-pangram text-xs leading-3 text-grey-500 font-semibold">
                Players
              </p>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-1.5">
                <SVG.Subtract size={12} />
                <span className="text-base leading-4 text-grey-800 font-bold font-pangram">
                  {avgDurationMin} min
                </span>
              </div>
              <p className="font-pangram text-xs leading-3 text-grey-500 font-semibold">
                Duration
              </p>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-1.5">
                <SVG.Medal size={12} />
                <span className="text-base leading-4 text-grey-800 font-bold font-pangram">
                  {minAge}+
                </span>
              </div>
              <p className="font-pangram text-xs leading-3 text-grey-500 font-semibold">
                Year olds
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="drawer-section flex flex-col gap-3 p-3 mt-1">
            <div className="flex items-center gap-2">
              <Button
                variant="pink"
                shape="pill-shape"
                className="w-full"
                onClick={() => {}}
              >
                <SVG.Heart />
                FAVORITE
              </Button>
              <Button
                variant="tertiary"
                shape="pill-shape"
                className="w-full"
                onClick={() => {}}
              >
                <SVG.Eye />
                SHARE
              </Button>
            </div>
            <Button variant="secondary" onClick={onGame} className="w-full">
              GAME ON!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
