"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { LogoPetSaid } from "@/components/ui/svgs/common/logo-pet-said";
import { Button } from "@/components/ui/button";

/* =================================================================
   NotFoundPage — Custom 404 page with crying mascot animation.

   Design:
   ┌─────────────────────────────────────────────────┐
   │                                                 │
   │          ┌──────────────┐                       │
   │          │  LogoPetSaid │  ← crying animation   │
   │          │  (mascot)    │     (tears + wobble)   │
   │          └──────────────┘                       │
   │                                                 │
   │              4  0  4                            │
   │                                                 │
   │       Oops! Page not found.                     │
   │   The page you're looking for doesn't exist     │
   │   or has been moved.                            │
   │                                                 │
   │         [ BACK TO HOME ]                        │
   │                                                 │
   └─────────────────────────────────────────────────┘
   ================================================================= */

export default function NotFoundPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const mascot = mascotRef.current;
    if (!container || !mascot) return;

    const ctx = gsap.context(() => {
      /* ── Entrance animation ── */
      const entranceTl = gsap.timeline();

      // Mascot drops in with bounce
      gsap.set(mascot, { y: -60, opacity: 0, scale: 0.8 });
      entranceTl.to(mascot, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "back.out(1.4)",
      });

      // 404 text characters stagger in
      const chars404 = container.querySelectorAll(".char-404");
      gsap.set(chars404, { y: 40, opacity: 0, rotateZ: -10 });
      entranceTl.to(
        chars404,
        {
          y: 0,
          opacity: 1,
          rotateZ: 0,
          duration: 0.5,
          ease: "back.out(2)",
          stagger: 0.12,
        },
        "-=0.3",
      );

      // Message fades in
      const message = container.querySelector(".not-found-message");
      if (message) {
        gsap.set(message, { y: 20, opacity: 0 });
        entranceTl.to(
          message,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2",
        );
      }

      // Button slides up
      const btn = container.querySelector(".not-found-btn");
      if (btn) {
        gsap.set(btn, { y: 20, opacity: 0 });
        entranceTl.to(
          btn,
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.15",
        );
      }

      /* ── Crying animation — gentle head wobble loop ── */
      gsap.to(mascot, {
        rotateZ: 3,
        duration: 0.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.7,
      });

      /* ── Tear drop animation ── */
      const tearPaths = mascot.querySelectorAll("path[fill^='url']");
      if (tearPaths.length) {
        gsap.to(tearPaths, {
          opacity: 0.4,
          duration: 0.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.3,
        });
      }

      /* ── Subtle floating for the whole mascot ── */
      gsap.to(mascot, {
        y: -6,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.7,
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen w-full flex-col items-center justify-center bg-grey-900 px-6"
    >
      {/* Mascot */}
      <div ref={mascotRef} className="mb-8">
        <LogoPetSaid width={160} height={125} />
      </div>

      {/* 404 Text */}
      <div className="flex items-center gap-3 mb-4">
        <span className="char-404 inline-block text-[120px] leading-none font-pangram font-black  text-white">
          4
        </span>
        <span className="char-404 inline-block text-[120px] leading-none  font-pangram  font-black  text-camelia-500">
          0
        </span>
        <span className="char-404 inline-block text-[120px] leading-none font-pangram  font-black  text-white">
          4
        </span>
      </div>

      {/* Message */}
      <div className="not-found-message flex flex-col items-center gap-2 mb-10 text-center">
        <h2 className="text-2xl font-bold font-display text-grey-900">
          Oops! Page not found.
        </h2>
        <p className="text-base font-medium text-grey-50 font-pangram max-w-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track!
        </p>
      </div>

      {/* Back to Home Button */}
      <div className="not-found-btn">
        <Link href="/">
          <Button variant="secondary" size="lg">
            Back to Home!
          </Button>
        </Link>
      </div>
    </div>
  );
}
