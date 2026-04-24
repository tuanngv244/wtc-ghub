"use client";

import React, {
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/use-sidebar-store";
import { sidebarNavigation } from "@/lib/navigation";
import type { NavItem } from "@/types/navigation";
import { SVG } from "../ui/svgs";
import {
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_EXPANDED_WIDTH,
} from "@/constants/sidebar";

/* =================================================================
   Sub-components
   ================================================================= */

interface NavItemComponentProps {
  item: NavItem;
  isExpanded: boolean;
  pathname: string;
  depth?: number;
}

function SidebarNavItem({
  item,
  isExpanded,
  pathname,
  depth = 0,
}: NavItemComponentProps) {
  const [isSubOpenInternal, setIsSubOpenInternal] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = pathname === item.href;
  const isHomeItem = item.href === "/";
  const childrenRef = useRef<HTMLDivElement>(null);

  // Derive effective sub-open state: always closed when sidebar is collapsed
  const isSubOpen = useMemo(
    () => isExpanded && isSubOpenInternal,
    [isExpanded, isSubOpenInternal],
  );

  const toggleSub = useCallback(() => {
    setIsSubOpenInternal((prev) => !prev);
  }, []);

  // Animate sub-menu open/close
  useLayoutEffect(() => {
    if (!childrenRef.current || !hasChildren) return;

    // Kill any existing tween on this element before starting a new one
    gsap.killTweensOf(childrenRef.current);

    if (isSubOpen && isExpanded) {
      gsap.fromTo(
        childrenRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.25, ease: "power2.out" },
      );
    } else {
      gsap.to(childrenRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [isSubOpen, isExpanded, hasChildren]);

  /* ── Render icon ─────────────────────────────────────── */
  const renderIcon = () => {
    // Prefer React SVG icon component
    if (item.IconComponent) {
      const IconComp = item.IconComponent;
      return (
        <IconComp
          size={20}
          color={isActive ? "#1A1A2E" : "white"}
          className="shrink-0 transition-colors duration-300"
        />
      );
    }
    // Legacy: path-based SVG via next/image
    if (item.iconSvg) {
      return (
        <Image
          src={item.iconSvg}
          alt=""
          width={20}
          height={20}
          className={cn(
            "shrink-0 transition-[filter] duration-300 h-5 w-5 object-contain",
            isActive ? "brightness-0" : "brightness-0 invert",
          )}
          aria-hidden
        />
      );
    }
    // Fallback to Iconify icon
    if (item.icon) {
      return (
        <Icon
          icon={item.icon}
          className={cn(
            "shrink-0 transition-colors duration-300",
            isActive ? "text-text-primary" : "text-white",
          )}
          width={20}
          height={20}
        />
      );
    }
    return null;
  };

  /* ── Render label + chevron ──────────────────────────── */
  const renderLabel = () => (
    <span
      className={cn(
        "flex items-center gap-3 min-w-0 flex-1 overflow-hidden whitespace-nowrap",
        "transition-opacity duration-300",
        isExpanded ? "opacity-100" : "opacity-0",
      )}
    >
      <span
        className={cn(
          "truncate text-base font-bold leading-5 font-display",
          isActive ? "text-text-primary" : "text-white",
        )}
      >
        {item.label}
      </span>
      {hasChildren && (
        <Icon
          icon={isSubOpen ? "hugeicons:arrow-up-01" : "hugeicons:arrow-down-01"}
          className={cn(
            "ml-auto shrink-0",
            isActive ? "text-text-primary" : "text-white",
          )}
          width={24}
          height={24}
        />
      )}
      {!hasChildren && isActive && isHomeItem && (
        <Icon
          icon="hugeicons:arrow-right-01"
          className="ml-auto shrink-0 text-text-primary"
          width={24}
          height={24}
        />
      )}
    </span>
  );

  /* ── Base classes ────────────────────────────────────── */
  // IMPORTANT: Never change width/padding/gap based on isExpanded!
  // The sidebar transitions its own width with overflow-hidden — items must keep
  // a fixed layout so the icon never shifts during the 0.4s sidebar animation.
  const baseClasses = cn(
    "sidebar-nav-item flex items-center  gap-3 rounded-[var(--radius-sidebar-item)] h-11 w-full px-3 cursor-pointer",
    "transition-colors duration-300",
    isActive && "bg-sky-blue-500 text-text-primary",
    !isActive && "text-white hover:bg-bg-sidebar-hover",
    depth > 0 && isExpanded && "pl-10",
  );

  return (
    <li className="w-full">
      {hasChildren ? (
        <button
          type="button"
          onClick={toggleSub}
          className={baseClasses}
          title={!isExpanded ? item.label : undefined}
        >
          {renderIcon()}
          {renderLabel()}
        </button>
      ) : (
        <Link
          href={item.href}
          className={baseClasses}
          title={!isExpanded ? item.label : undefined}
        >
          {renderIcon()}
          {isExpanded && renderLabel()}
        </Link>
      )}

      {hasChildren && (
        <div
          ref={childrenRef}
          className="overflow-hidden"
          style={{ height: 0 }}
        >
          <ul className="mt-1 flex flex-col gap-0.5">
            {item.children!.map((child) => (
              <SidebarNavItem
                key={child.href}
                item={child}
                isExpanded={isExpanded}
                pathname={pathname}
                depth={depth + 1}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

/* =================================================================
   Sidebar Logo
   ================================================================= */

function SidebarLogo({ isExpanded }: { isExpanded: boolean }) {
  const logoRef = useRef<HTMLDivElement>(null);

  /* ── Infinite pet animation: eyes blink + look around, nose wiggles ── */
  useLayoutEffect(() => {
    const el = logoRef.current;
    if (!el) return;

    const eyeLeft = el.querySelector("#eye-left");
    const eyeRight = el.querySelector("#eye-right");
    const nose = el.querySelector("#nose");

    if (!eyeLeft && !eyeRight && !nose) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

      /* ── Blink ── */
      if (eyeLeft && eyeRight) {
        tl.to(
          [eyeLeft, eyeRight],
          {
            scaleY: 0.1,
            transformOrigin: "center center",
            duration: 0.08,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          },
          0,
        );
      }

      /* ── Look right ── */
      if (eyeLeft && eyeRight) {
        tl.to(
          [eyeLeft, eyeRight],
          { x: 2, duration: 0.4, ease: "power1.inOut" },
          1.2,
        );
      }
      if (nose) {
        tl.to(nose, { x: 1, duration: 0.4, ease: "power1.inOut" }, 1.2);
      }

      /* ── Blink while looking right ── */
      if (eyeLeft && eyeRight) {
        tl.to(
          [eyeLeft, eyeRight],
          {
            scaleY: 0.1,
            transformOrigin: "center center",
            duration: 0.08,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          },
          2.0,
        );
      }

      /* ── Look left ── */
      if (eyeLeft && eyeRight) {
        tl.to(
          [eyeLeft, eyeRight],
          { x: -2, duration: 0.6, ease: "power1.inOut" },
          2.8,
        );
      }
      if (nose) {
        tl.to(nose, { x: -1, duration: 0.6, ease: "power1.inOut" }, 2.8);
      }

      /* ── Back to center ── */
      if (eyeLeft && eyeRight) {
        tl.to(
          [eyeLeft, eyeRight],
          { x: 0, duration: 0.4, ease: "power1.inOut" },
          4.0,
        );
      }
      if (nose) {
        tl.to(nose, { x: 0, duration: 0.4, ease: "power1.inOut" }, 4.0);
      }

      /* ── Final blink ── */
      if (eyeLeft && eyeRight) {
        tl.to(
          [eyeLeft, eyeRight],
          {
            scaleY: 0.1,
            transformOrigin: "center center",
            duration: 0.08,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          },
          4.8,
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={logoRef}
      className="sidebar-logo flex items-center justify-center px-3 pb-4 pt-5 h-[92px]"
    >
      <div className="relative w-full h-15 flex items-center justify-center">
        {/* Expanded logo — fades in/out, no layout shift */}
        <div
          className={cn(
            "flex items-center justify-center gap-1.5 w-full min-w-50 overflow-hidden h-15",
            "transition-opacity duration-300",
            !isExpanded ? "opacity-0 pointer-events-none" : "opacity-100",
          )}
        >
          <SVG.Logo.Normal />
          <div className="flex flex-col gap-1.5">
            <SVG.Logo.Full />
            <span className="text-base text-white whitespace-nowrap leading-2.75 font-medium [font-family:var(--font-pp-pangram)]">
              Sneak click only!
            </span>
          </div>
        </div>
        {/* Collapsed logo — always in DOM, fades in/out */}
        <div
          className={cn(
            "flex flex-col gap-2 items-center justify-center",
            "transition-opacity absolute top-1/2 left-1/2 -translate-1/2 duration-300",
            isExpanded ? "opacity-0 pointer-events-none" : "opacity-100",
          )}
        >
          <SVG.Logo.Normal width={43} height={35} />
          <SVG.Logo.Full width={57} height={19} />
        </div>
      </div>
    </div>
  );
}

/* =================================================================
   Main Sidebar Component
   ================================================================= */

export function Sidebar() {
  const navRef = useRef<HTMLDivElement>(null);
  const { isExpanded, isMobileOpen, toggle, closeMobile } = useSidebarStore();
  const pathname = usePathname();
  const [hasMounted, setHasMounted] = useState(false);

  // Track mount state so CSS transition only applies after first render
  useEffect(() => {
    // Small delay to ensure first paint has width set without transition
    const id = requestAnimationFrame(() => setHasMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      {/* ─── Desktop Sidebar ─── */}
      <aside
        className="hidden md:flex flex-col h-screen bg-grey-900 sticky top-0 z-40 overflow-hidden shrink-0"
        style={{
          width: isExpanded ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_COLLAPSED_WIDTH,
          transition: hasMounted
            ? "width 0.4s cubic-bezier(.81,.2,.32,.93)"
            : "none",
        }}
      >
        <SidebarLogo isExpanded={isExpanded} />

        {/* Navigation */}
        <nav
          ref={navRef}
          className="flex-1 overflow-y-auto overflow-x-hidden px-4.5 py-2"
        >
          {sidebarNavigation.map((section, sectionIndex) => (
            <React.Fragment key={section.title ?? sectionIndex}>
              <div className="mb-3">
                {section.title && isExpanded && (
                  <p className="sidebar-section-title [font-family:var(--font-pp-pangram)] mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-text-muted ">
                    {section.title}
                  </p>
                )}
                {section.title && !isExpanded && (
                  <p className="sidebar-section-title mb-2 text-center text-xs font-semibold uppercase tracking-wider text-text-muted [font-family:var(--font-pp-pangram)]">
                    {section.title}
                  </p>
                )}
                <ul className="flex flex-col gap-0.5">
                  {section.items.map((item) => (
                    <SidebarNavItem
                      key={item.href}
                      item={item}
                      isExpanded={isExpanded}
                      pathname={pathname}
                    />
                  ))}
                </ul>
              </div>
              {sectionIndex !== sidebarNavigation?.length - 1 && (
                <div className="w-full border-t border-dashed border-grey-600 my-4"></div>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Collapse toggle */}
        <div className="border-t border-neutral-700/20 py-2 px-4.5">
          <button
            type="button"
            onClick={toggle}
            className={cn(
              "sidebar-collapse-btn flex items-center gap-3 rounded-[var(--radius-sidebar-item)] h-11 w-full px-3 text-white transition-colors duration-300 hover:bg-bg-sidebar-hover cursor-pointer",
            )}
            title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            <Icon
              icon="hugeicons:sidebar-left"
              width={20}
              height={20}
              className={cn(
                "shrink-0 transition-transform duration-300",
                !isExpanded && "rotate-180",
              )}
            />
            <span
              className={cn(
                "flex items-center gap-3 min-w-0 flex-1 overflow-hidden whitespace-nowrap transition-opacity duration-300",
                isExpanded ? "opacity-100" : "opacity-0",
              )}
            >
              <span className="text-sm font-medium font-display">Collapse</span>
              <Icon
                icon="hugeicons:arrow-left-01"
                className="ml-auto shrink-0"
                width={16}
                height={16}
              />
            </span>
          </button>
        </div>
      </aside>

      {/* ─── Mobile Overlay ─── */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-bg-overlay md:hidden"
          onClick={closeMobile}
          onKeyDown={(e) => e.key === "Escape" && closeMobile()}
          role="button"
          tabIndex={-1}
          aria-label="Close sidebar"
        />
      )}

      {/* ─── Mobile Drawer ─── */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col bg-grey-900 transition-transform duration-300 ease-in-out md:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarLogo isExpanded={true} />

        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-2">
          {sidebarNavigation.map((section, sectionIndex) => (
            <div key={section.title ?? sectionIndex} className="mb-3">
              {section.title && (
                <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted font-display">
                  {section.title}
                </p>
              )}
              <ul className="flex flex-col gap-0.5">
                {section.items.map((item) => (
                  <SidebarNavItem
                    key={item.href}
                    item={item}
                    isExpanded={true}
                    pathname={pathname}
                  />
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Close button */}
        <div className="border-t border-neutral-700/20 p-2">
          <button
            type="button"
            onClick={closeMobile}
            className="flex w-full items-center gap-3 rounded-[var(--radius-sidebar-item)] px-3 py-2.5 text-white transition-colors hover:bg-bg-sidebar-hover cursor-pointer"
          >
            <Icon
              icon="hugeicons:cancel-01"
              width={20}
              height={20}
              className="shrink-0"
            />
            <span className="text-sm font-medium font-display">Close</span>
          </button>
        </div>
      </aside>

      {/* ─── Mobile Header Bar (hamburger) ─── */}
      <div className="sticky top-0 z-30 flex h-14 items-center gap-3 bg-grey-900 px-4 md:hidden">
        <button
          type="button"
          onClick={() => useSidebarStore.getState().openMobile()}
          className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sidebar-item)] text-white hover:bg-bg-sidebar-hover"
          aria-label="Open sidebar"
        >
          <Icon icon="hugeicons:menu-02" width={24} height={24} />
        </button>
        <Image
          src="/images/assets/logo-default.svg"
          alt="Snick"
          width={28}
          height={30}
          className="h-auto w-7"
        />
      </div>
    </>
  );
}
