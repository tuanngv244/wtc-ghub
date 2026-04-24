"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { useUIStore } from "@/stores/use-ui-store";
import { cn } from "@/lib/utils";

/* =================================================================
   SplitChars — renders each character as an individual inline-block
   span so GSAP can animate them independently.
   ================================================================= */

function SplitChars({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span key={i} className={`banner-char inline-block ${className ?? ""}`}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

/* =================================================================
   Banner — Hero section with GSAP per-character text reveal.
   Characters are pre-split in JSX (React-safe), GSAP only animates.
   ================================================================= */

export function Banner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoadingDone = useUIStore((s) => s.isLoadingDone);

  useEffect(() => {
    if (!isLoadingDone) return;

    const el = containerRef.current;
    if (!el) return;

    /* Resolve scroller element — must exist in DOM before ScrollTrigger uses it */
    const scroller = document.querySelector(".main-wrapper");

    const ctx = gsap.context(() => {
      const chars = el.querySelectorAll<HTMLElement>(".banner-char");
      if (!chars.length) return;

      gsap.set(chars, { y: "110%", opacity: 0 });

      gsap.to(chars, {
        y: "0%",
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.03,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
          ...(scroller ? { scroller } : {}),
        },
      });
    }, el);

    return () => ctx.revert();
  }, [isLoadingDone]);

  return (
    <SectionWrapper id="banner">
      <div
        ref={containerRef}
        className=" after:rounded-2xl rounded-2xl relative after:content-[''] after:absolute after:w-full after:h-full after:left-0 after:top-0 after:bg-[#b5d0ff] after:z-2 after:border after:border-solid after:border-[#2A63C6] w-full py-4 px-6 sm:px-16 md:px-32 before:content-[''] before:absolute before:w-full before:h-full before:rounded-2xl before:left-0 before:z-1 before:-bottom-1 before:bg-[#7da4e8] before:border before:border-solid before:border-[#2A63C6]"
      >
        <h1
          className={cn(
            "font-mori relative font- text-black z-5 text-2xl sm:text-4xl md:text-5xl leading-tight md:leading-14.5 font-black ",
            "[text-shadow:3px_0_#fff,-3px_0_#fff,0_3px_#fff,0_-3px_#fff,2px_2px_#fff,-2px_-2px_#fff,2px_-2px_#fff,-2px_2px_#fff,4px_4px_0_#ADCBFF]",
            "tracking-[2px]",
          )}
        >
          <span className="inline-block">
            <span className="banner-row inline-block">
              <SplitChars text="Your " />
              <span className="text-(--color-camelia-500)">
                <SplitChars text="Free -To -Play" />
              </span>
            </span>
          </span>
          <br />
          <span className="inline-block ">
            <span className="banner-row inline-block">
              <SplitChars text=" Game Hub" />
            </span>
          </span>
        </h1>
      </div>
    </SectionWrapper>
  );
}
