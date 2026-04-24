"use client";

import { Search01Icon } from "@hugeicons/core-free-icons";
import { Button } from "../button";
import { useBoolean } from "@/hooks/useBoolean";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { SVG } from "../svgs";
import { ALL_GAMES } from "@/constants/mock-data";
import { useDebounce } from "@/hooks/useDebounce";
import SearchPanel from "./search-panel";
import gsap from "gsap";
import { useGameDrawerStore } from "@/stores/use-game-drawer-store";
import { IGame } from "@/types/game";

/* =================================================================
   Constants
   ================================================================= */
const RECENT_SEARCHES_KEY = "snick-recent-searches";
const MAX_RECENT = 10;

/* =================================================================
   Helpers — recent searches in localStorage
   ================================================================= */
function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function addRecentSearch(term: string) {
  const cleaned = term.trim();
  if (!cleaned) return;
  const recent = getRecentSearches().filter((r) => r !== cleaned);
  recent.unshift(cleaned);
  localStorage.setItem(
    RECENT_SEARCHES_KEY,
    JSON.stringify(recent.slice(0, MAX_RECENT)),
  );
}

function clearRecentSearches() {
  localStorage.removeItem(RECENT_SEARCHES_KEY);
}

/* =================================================================
   Search Component
   ================================================================= */
interface SearchProps {}

const Search = ({}: SearchProps) => {
  const { open, on, off } = useBoolean();
  const [srchVal, setSrchVal] = useState<string>("");
  // recentVersion is bumped to force re-read from localStorage
  const [recentVersion, setRecentVersion] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const { openWithGame } = useGameDrawerStore();

  const debouncedVal = useDebounce(srchVal, 1000);
  const isSearching = srchVal !== debouncedVal && srchVal.length > 0;

  const filteredData = useMemo(() => {
    if (!debouncedVal.trim()) return [];
    const q = debouncedVal.toLowerCase();
    return ALL_GAMES.filter((game) => game.name.toLowerCase().includes(q));
  }, [debouncedVal]);

  // Derive recent searches from localStorage (re-read when version bumps)
  const recentSearches = useMemo(
    () => getRecentSearches(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [recentVersion],
  );

  // Determine if panel should show
  const panelVisible = useMemo(() => {
    if (!open) return false;
    if (debouncedVal.trim().length > 0) return true;
    if (srchVal.trim().length === 0 && recentSearches.length > 0) return true;
    if (isSearching) return true;
    return false;
  }, [open, debouncedVal, srchVal, recentSearches.length, isSearching]);

  const showRecent =
    open &&
    srchVal.trim().length === 0 &&
    !isSearching &&
    recentSearches.length > 0;

  // GSAP panel entrance animation
  useEffect(() => {
    if (!panelVisible) return;

    let rafId: number;
    const ctx = gsap.context(() => {
      rafId = requestAnimationFrame(() => {
        const el = panelRef.current;
        if (!el) return;

        gsap.fromTo(
          el,
          { opacity: 0, y: -8, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power2.out" },
        );
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, [panelVisible]);

  const _onOpen = () => {
    on();
    setRecentVersion((v) => v + 1); // refresh recent from localStorage
    setTimeout(() => inputRef.current?.focus(), 150);
  };

  const _onClose = () => {
    // Save current search term to recent before closing
    if (debouncedVal.trim()) {
      addRecentSearch(debouncedVal.trim());
    }
    off();
    setSrchVal("");
  };

  const onChoose = useCallback((data: IGame) => {
    addRecentSearch(data.name);
    setRecentVersion((v) => v + 1);
    openWithGame(data);
    off();
    setSrchVal("");
  }, []);

  const onRecentClick = useCallback((term: string) => {
    setSrchVal(term);
  }, []);

  const onClearRecent = useCallback(() => {
    clearRecentSearches();
    setRecentVersion((v) => v + 1);
  }, []);

  return (
    <div className={cn("relative flex-shrink-0 transition-[width] duration-300", open ? "w-[calc(100vw-2rem)] sm:w-100" : "w-10 sm:w-100")}>
      <div
        className={cn(
          "ml-auto rounded-full border border-solid relative border-transparent w-10 h-10 transition-[width,border-color] duration-300",
          open ? "w-full border-grey-900" : "",
        )}
      >
        <Button
          variant="primary"
          shape="circle"
          icon={Search01Icon}
          onClick={_onOpen}
          className={cn(
            "absolute z-2 -top-px -left-px w-10 h-10",
            open ? "shadow-[0_0_0_0_var(--color-btn-primary-shadow)]" : "",
          )}
        />
        <input
          ref={inputRef}
          type="text"
          value={srchVal}
          onChange={(e) => setSrchVal(e.target.value)}
          placeholder="Game name here..."
          className={cn(
            "w-0 h-full rounded-full absolute z-1 top-0 left-0 py-3 pr-0 pl-0 bg-[#ECEEEE] duration-200 transition-[width,padding] text-xs leading-4 font-medium text-black font-pangram outline-none",
            open ? "w-full pr-20 pl-12" : "0",
          )}
        />

        {/* Sync icon — visible when search has text */}
        <button
          onClick={() => {
            inputRef.current?.focus();
            setSrchVal("");
          }}
          className={cn(
            "w-6.5 h-6.5  drop-shadow-[0_2px_0_rgba(0,0,0,0.25)] cursor-pointer rounded-full bg-grey-300 flex items-center justify-center",
            "absolute z-2 top-1/2 -translate-y-1/2 right-10 invisible opacity-0 transition-[opacity,visibility,filter] duration-200 active:drop-shadow-[0_0_0_rgba(0,0,0,0.25)]",
            open && srchVal.trim().length > 0 ? "visible opacity-100" : "",
          )}
        >
          <SVG.Sync width={13} height={15} />
        </button>

        {/* Close button */}
        <button
          onClick={_onClose}
          className={cn(
            "w-6.5 h-6.5 cursor-pointer drop-shadow-[0_2px_0_rgba(0,0,0,0.25)] rounded-full bg-orange-500 flex items-center justify-center",
            "active:drop-shadow-[0_0_0_rgba(0,0,0,0.25)] absolute z-2 top-1/2 -translate-y-1/2 right-2 invisible opacity-0 transition-[opacity,visibility,filter] duration-200",
            open ? "visible opacity-100" : "",
          )}
        >
          <SVG.Close size={13} className="orange-500" />
        </button>
      </div>

      {panelVisible && (
        <SearchPanel
          ref={panelRef}
          data={filteredData}
          open={panelVisible}
          isLoading={isSearching}
          searchTerm={debouncedVal}
          showRecent={showRecent}
          recentSearches={recentSearches}
          onChoose={onChoose}
          onRecentClick={onRecentClick}
          onClearRecent={onClearRecent}
        />
      )}
    </div>
  );
};

export default Search;
