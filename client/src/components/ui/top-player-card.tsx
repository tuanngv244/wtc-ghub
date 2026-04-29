/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Button } from "./button";
import { SVG } from "./svgs";
import type { PostResponse } from "@/types/blog";

export interface TopPlayerCardProps extends PostResponse {}

export function TopPlayerCard({
  title,
  summary,
  thumbnailUrl,
  status,
}: TopPlayerCardProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const pinsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  /* ── Gentle infinite swaying animation for bottom-content & pins ── */
  useEffect(() => {
    const bottom = bottomRef.current;
    const pins = pinsRef.current;
    const card = cardRef.current;
    if (!bottom || !pins || !card) return;

    /* Random offset so each card sways at different timing & direction */
    const randomDelay = Math.random() * 2;
    const direction = Math.random() > 0.5 ? 1 : -1;

    const tweens: gsap.core.Tween[] = [];

    const ctx = gsap.context(() => {
      /* Bottom content — pendulum sway, alternating directions per card */
      tweens.push(
        gsap.fromTo(
          bottom,
          { rotateZ: -2 * direction },
          {
            rotateZ: 2 * direction,
            duration: 2 + Math.random() * 0.8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: randomDelay,
            transformOrigin: "top center",
          },
        ),
      );

      /* Individual pins — each sways independently like keychains */
      const pinEls = pins.querySelectorAll("img");
      pinEls.forEach((pin, i) => {
        const pinDir = i % 2 === 0 ? 1 : -1;
        tweens.push(
          gsap.fromTo(
            pin,
            { rotateZ: -3 * pinDir },
            {
              rotateZ: 3 * pinDir,
              duration: 1.4 + Math.random() * 0.8,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: randomDelay + i * 0.2,
              transformOrigin: "top center",
            },
          ),
        );
      });
    }, bottomRef);

    // Pause infinite animations when card is off-screen to save CPU
    const observer = new IntersectionObserver(
      ([entry]) => {
        tweens.forEach((tw) =>
          entry.isIntersecting ? tw.resume() : tw.pause(),
        );
      },
      { threshold: 0 },
    );
    observer.observe(card);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={cardRef} className="flex flex-col">
      <div className="rounded-2xl bg-white border border-solid border-grey-900 p-1.5 pb-4 shadow-[6px_6px_0px_0px_rgba(205,207,210,1)]">
        <div className="overflow-hidden aspect-253/142 ">
          <div className="bg-white absolute top-1.2 left-4 border-r border-l border-b rounded-bl-[12px] rounded-br-[12px] border-solid border-grey-900 flex items-center justify-center ">
            <p className=" text-sm leading-4 font-bold text-black py-1 px-2">
              {status}
            </p>
          </div>
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div
        ref={bottomRef}
        className="bottom-content relative rounded-[20px] border border-solid border-grey-900 py-3 px-2 mt-2.25 shadow-[6px_6px_0px_0px_rgba(205,207,210,1)]"
      >
        {/* pin list */}
        <div
          ref={pinsRef}
          className="flex items-center justify-center gap-2 absolute -top-6 left-1/2 -translate-x-1/2 w-full"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <img
              src="/images/assets/pin.png"
              alt="pin"
              className="w-9.5 h-8.75"
              key={index}
            />
          ))}
        </div>

        {/* content */}
        <h6 className="text-xl leading-6 font-pangram font-bold line-clamp-3 text-grey-900">
          {title}
        </h6>
        <div className="flex items-center justify-end mt-5">
          <Button
            variant="primary"
            className="group relative w-30 hover:w-full duration-300 transition-[width] flex items-center"
          >
            Dive in{" "}
            <SVG.ArrowRightV2
              className="invisible opacity-0 absolute right-4 top-1/2 -translate-x-4 -translate-y-1/2 duration-300 transition-[transform,opacity,visibility] group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
              size={14}
            />{" "}
            <SVG.ThreeDots
              className="visible min-w-3.5 opacity-100 duration-300 transition-[opacity,visibility] group-hover:invisible group-hover:opacity-0"
              size={14}
            />{" "}
          </Button>
        </div>
      </div>
    </div>
  );
}
