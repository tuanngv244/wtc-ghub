"use client";

import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { useSidebarStore } from "@/stores/use-sidebar-store";
import {
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_EXPANDED_WIDTH,
} from "@/constants/sidebar";
import { Footer } from "./footer";
import { GameDrawer } from "../ui/GameDrawer";
import { PageTransition } from "../ui/page-transition";
import { useEffect, useState } from "react";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { isExpanded } = useSidebarStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar — sticky, full height */}
      <Sidebar />

      {/* Main content area — light pattern background from Figma */}
      <main id="app-shell" className="flex-1 md:py-5 md:pr-10 md:bg-grey-900">
        <div
          className="main-wrapper overflow-x-hidden overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden h-[calc(100vh-3.5rem)] md:h-[calc(100vh-2.5rem)] md:rounded-4xl relative"
          style={{
            backgroundImage: "url('/images/assets/main-background.jpg')",
            backgroundRepeat: "repeat",
            backgroundSize: "100%",
            width: isMobile
              ? "100%"
              : isExpanded
                ? `calc(100vw - ${SIDEBAR_EXPANDED_WIDTH + 40}px)`
                : `calc(100vw - ${SIDEBAR_COLLAPSED_WIDTH + 40}px)`,
            transition: "width 0.4s cubic-bezier(.81,.2,.32,.93)",
          }}
        >
          <PageTransition svgId="page-transition" className="absolute!" />
          <div className="mx-auto w-full flex flex-col">{children}</div>
          <Footer />
        </div>
      </main>

      <GameDrawer />
    </div>
  );
}
