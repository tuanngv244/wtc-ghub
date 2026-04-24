"use client";

import { Button } from "@/components/ui/button";
import Search from "@/components/ui/search";
import Link from "next/link";

export function TopBar() {
  return (
    <div
      id="top-bar"
      className="flex w-full justify-between items-center gap-4 py-4 px-4 sm:px-7"
    >
      <h5 className="hidden sm:block font-semibold text-base sm:text-xl leading-8 shrink-0">
        Shhhh... We won’t tell your boss! &nbsp;
      </h5>
      <Search />
    </div>
  );
}
