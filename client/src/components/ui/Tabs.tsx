"use client";

import { cn } from "@/lib/utils";

/* =================================================================
   Tabs — Pill-shaped tab group from Figma design system

   Design: A row of tab buttons inside a subtle container.
   The active tab gets the dark 3D button treatment (same as primary button).
   Inactive tabs are ghost-style.
   ================================================================= */

export interface Tab {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-bg-card p-1 border border-border-card",
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "rounded-full px-6 py-2.5 text-sm font-bold tracking-wide",
              "transition-[background-color,color,box-shadow] duration-200 ease-out",
              "cursor-pointer select-none",
              isActive
                ? "bg-btn-primary-bg text-text-inverse shadow-[0_3px_0_0_var(--color-btn-primary-shadow)]"
                : "text-text-secondary hover:text-text-primary hover:bg-bg-hover",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
