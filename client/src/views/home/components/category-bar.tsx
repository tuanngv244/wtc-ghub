"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { CategoriesSVG, SVG } from "@/components/ui/svgs";
import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/stores/use-category-store";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const CATEGORY_ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  action: CategoriesSVG.Action,
  party: CategoriesSVG.Party,
  family: CategoriesSVG.Family,
  strategy: CategoriesSVG.Strategy,
  "co-op": CategoriesSVG.Coop,
  puzzle: CategoriesSVG.Puzzle,
  solo: CategoriesSVG.Solo,
  boardgame: CategoriesSVG.Boardgame,
};

export function CategoryBar() {
  const [actCate, setActCate] = useState<string | null>(null);
  const { categories } = useCategoryStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll category list left/right
  const scrollBy = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 200;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  // GSAP draw-line animation for BottomLine when active category changes
  useLayoutEffect(() => {
    if (actCate === null) return;

    const ctx = gsap.context(() => {
      const activeItem = containerRef.current?.querySelector(
        `[data-cate-id="${actCate}"]`,
      );
      if (!activeItem) return;

      const paths = activeItem.querySelectorAll(
        ".bottom-line-svg path",
      ) as NodeListOf<SVGPathElement>;

      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: `${length}`, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 0.4,
            ease: "power2.out",
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [actCate]);

  return (
    <SectionWrapper>
      <div
        ref={containerRef}
        id="category-bar"
        className="flex items-center w-full relative mt-3 mb-2"
      >
        <img
          src="/images/categories/handheld-left.png"
          alt="handheld left"
          onClick={() => scrollBy("left")}
          className={cn(
            "w-9.5 h-14 duration-200 transition-[filter] cursor-pointer drop-shadow-[1px_2px_0_var(--color-grey-900)]",
            "active:drop-shadow-[0_0_0_var(--color-grey-900)]",
          )}
        />
        <div
          ref={scrollRef}
          className={cn(
            "category-list flex flex-1 items-center justify-between relative overflow-hidden",
            "rounded-xs border border-solid border-black border-b-2 w-full",
            "overflow-x-auto overflow-y-hidden h-14 bg-[#F7FBFC]",
            "scrollbar-hide",
          )}
        >
          {/* patern */}
          <img
            src="/images/assets/cate-left-patern.png"
            alt="Left patern"
            className="absolute bottom-0 left-0 w-43"
          />
          <img
            src="/images/assets/cate-right-patern.png"
            alt="Left patern"
            className="absolute right-0 top-0 w-43"
          />
          {/* All Games */}
          <div
            data-cate-id="all"
            className={cn(
              "flex flex-1 items-center justify-center relative gap-1.5 cursor-pointer group py-4.5 px-3",
            )}
            onClick={() => setActCate(null)}
          >
            <img
              src="/images/assets/blue-vertical-line.png"
              alt="Blue Line"
              className="absolute -right-2 top-1/2 -translate-y-1/2 w-3.75 h-full"
            />
            <CategoriesSVG.All
              className={cn(
                "duration-200 transition-transform",
                "group-hover:-rotate-12",
              )}
            />
            <p
              className={cn(
                "text-base leading-5 whitespace-nowrap font-bold text-grey-900 relative",
                "duration-200 transition-transform",
                "group-hover:-rotate-8",
              )}
            >
              All Games
              <SVG.BottomLine
                className={cn(
                  "bottom-line-svg absolute -bottom-0.5 left-1/2 -translate-x-1/2",
                  "duration-300 transition-opacity",
                  actCate === null
                    ? "opacity-100 visible"
                    : "opacity-0 invisible",
                )}
              />
              <SVG.Union
                className={cn(
                  "absolute -right-2 top-0 opacity-0 invisible",
                  "duration-300 transition-[transform,opacity,visibility] -translate-x-8",
                  "group-hover:translate-x-2 group-hover:opacity-100 group-hover:visible",
                )}
              />
            </p>
          </div>
          {categories.map((category, index) => {
            const Icon =
              CATEGORY_ICON_MAP[category.slug] ?? CategoriesSVG.Other;
            const cateIndex = index + 1;
            return (
              <div
                data-cate-id={category.id}
                className={cn(
                  "flex flex-1 items-center justify-center relative gap-1.5 cursor-pointer group py-4.5 px-3",
                )}
                onClick={() => setActCate(category.id)}
                key={category.id}
              >
                {/* line */}
                {cateIndex % 2 == 0 && cateIndex !== categories.length && (
                  <img
                    src="/images/assets/red-vertical-line.png"
                    alt="Red Line"
                    className="absolute -right-2 top-1/2 -translate-y-1/2 w-3.75 h-full"
                  />
                )}
                {cateIndex % 2 != 0 && (
                  <img
                    src="/images/assets/blue-vertical-line.png"
                    alt="Blue Line"
                    className="absolute -right-2 top-1/2 -translate-y-1/2 w-3.75 h-full"
                  />
                )}

                <Icon
                  className={cn(
                    "duration-200 transition-transform",
                    "group-hover:-rotate-12",
                  )}
                />
                <p
                  className={cn(
                    "text-base leading-5 whitespace-nowrap font-bold text-grey-900 relative",
                    "duration-200 transition-transform",
                    "group-hover:-rotate-8",
                  )}
                >
                  {category.name}
                  <SVG.BottomLine
                    className={cn(
                      "bottom-line-svg absolute -bottom-0.5 left-1/2 -translate-x-1/2",
                      "duration-300 transition-opacity",
                      category.id === actCate
                        ? "opacity-100 visible"
                        : "opacity-0 invisible",
                    )}
                  />
                  <SVG.Union
                    className={cn(
                      "absolute -right-2 top-0 opacity-0 invisible",
                      "duration-300 transition-[transform,opacity,visibility] -translate-x-8",
                      "group-hover:translate-x-2 group-hover:opacity-100 group-hover:visible",
                    )}
                  />
                </p>
              </div>
            );
          })}
        </div>
        <img
          src="/images/categories/handheld-right.png"
          alt="handheld right"
          onClick={() => scrollBy("right")}
          className={cn(
            "w-9.5 h-14 duration-200 transition-[filter] cursor-pointer drop-shadow-[1px_2px_0_var(--color-grey-900)]",
            "active:drop-shadow-[0_0_0_var(--color-grey-900)]",
          )}
        />
      </div>
    </SectionWrapper>
  );
}
