"use client";

import gsap from "gsap";
import { TransitionRouter } from "next-transition-router";
import { ReactNode, useEffect, useRef } from "react";

interface ProviderProps {
  children: ReactNode;
}

export default function TransitionProvider({ children }: ProviderProps) {
  const pathsRef = useRef<SVGPathElement[]>([]);

  useEffect(() => {
    const pageTransition = document.getElementById("page-transition");

    if (!pageTransition) return;
    pathsRef.current = Array.from(pageTransition.querySelectorAll("path"));
    pathsRef.current.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    });
  }, []);

  const handleLeave = (next: () => void) => {
    const tl = gsap.timeline({ onComplete: next });
    pathsRef.current.forEach((path) => {
      tl.to(
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
    return () => tl.kill();
  };

  const handleEnter = (next: () => void) => {
    const tl = gsap.timeline({ onComplete: next });
    pathsRef.current.forEach((path) => {
      const length = path.getTotalLength();
      tl.to(
        path,
        {
          strokeDashoffset: -length,
          attr: { "stroke-width": 200 },
          duration: 1,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.set(path, {
              strokeDashoffset: length,
            });
          },
        },
        0,
      );
    });
    return () => tl.kill();
  };

  return (
    <TransitionRouter auto leave={handleLeave} enter={handleEnter}>
      {children}
    </TransitionRouter>
  );
}
