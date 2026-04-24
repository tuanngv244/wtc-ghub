import Image from "next/image";
import { cn } from "@/lib/utils";
import { SVG } from "../svgs";
import type { IGame } from "@/types/game";
import type { RefObject } from "react";
import { Chip } from "../chip";

interface SearchPanelProps {
  ref?: RefObject<HTMLDivElement | null>;
  open: boolean;
  data: IGame[];
  isLoading?: boolean;
  searchTerm: string;
  showRecent?: boolean;
  recentSearches?: string[];
  onChoose: (data: IGame) => void;
  onRecentClick?: (term: string) => void;
  onClearRecent?: () => void;
}

const SearchPanel = ({
  ref,
  open,
  data,
  isLoading,
  searchTerm,
  showRecent,
  recentSearches = [],
  onChoose,
  onRecentClick,
  onClearRecent,
}: SearchPanelProps) => {
  if (!open) return null;

  const hasSearched = searchTerm.trim().length > 0;

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 mt-2 w-full border border-solid border-grey-700 rounded-[20px] bg-[#ECEEEE] p-4 z-50 shadow-lg"
    >
      {/* ── Recent searches (no search term typed) ── */}
      {showRecent && !isLoading && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-grey-800 font-pangram">
              Recent:
            </span>
            {onClearRecent && recentSearches.length > 0 && (
              <button
                type="button"
                onClick={onClearRecent}
                className="text-[10px] font-medium text-grey-700 font-pangram underline cursor-pointer hover:text-grey-700 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((term) => (
              <Chip key={term} onClick={() => onRecentClick?.(term)}>
                {term}
              </Chip>
            ))}
          </div>
        </div>
      )}

      {/* ── Loading ── */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-grey-500 border-t-grey-900" />
          <span className="ml-3 text-sm font-medium text-grey-600 font-pangram">
            Searching...
          </span>
        </div>
      )}

      {/* ── Nothing found ── */}
      {!showRecent && !isLoading && hasSearched && data.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 ">
          <span className="text-lg font-bold text-grey-800 font-pangram">
            Nothing found!
          </span>
          <SVG.Logo.Said width={80} height={63} />
          <p className="text-sm text-grey-600 font-pangram text-center max-w-xs">
            Your search{" "}
            <span className="font-bold italic">&ldquo;{searchTerm}&rdquo;</span>{" "}
            did not match any games.
            <br />
            <span className="underline">Please try again.</span>
          </p>
        </div>
      )}

      {/* ── Results list — 2-column grid, scrollable ── */}
      {!showRecent && !isLoading && hasSearched && data.length > 0 && (
        <div>
          <span className="text-sm font-bold text-grey-800 font-pangram mb-3 block">
            Showing: {data.length} result{data.length !== 1 ? "s" : ""}
          </span>
          <div className="max-h-80 overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-2">
              {data.map((game, index) => (
                <button
                  key={`${game.name}-${index}`}
                  type="button"
                  onClick={() => onChoose(game)}
                  className={cn(
                    "flex border border-solid border-transparent items-center gap-3 rounded-2xl p-1 text-left",
                    "transition-[border-color,background-color,transform] duration-200 cursor-pointer",
                    "hover:border-black hover:bg-white active:scale-[0.98]",
                  )}
                >
                  <div className="p-1 bg-white rounded-2xl min-w-13 w-13 h-13 border border-solid border-black">
                    <img
                      src={game.url}
                      alt={game.name}
                      className="h-full w-full shrink-0 rounded-xl object-center border border-solid border-black"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 overflow-hidden">
                    <span className="truncate text-sm font-bold text-grey-900 font-pangram">
                      {game.name}
                    </span>
                    <span className="truncate text-xs font-medium text-grey-500 font-pangram">
                      {game.types.join(" · ")}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPanel;
