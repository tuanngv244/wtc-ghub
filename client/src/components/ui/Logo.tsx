import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

/* =================================================================
   Logo — Snick brand mark from Figma design system

   The cat mascot icon + "Snick" wordmark + tagline.
   Sizes: sm (icon only), md (icon + wordmark), lg (full with tagline)
   ================================================================= */

export interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  className?: string;
}

const iconSizes = { sm: 32, md: 40, lg: 48 } as const;

export function Logo({ size = "md", variant = "dark", className }: LogoProps) {
  const textColor = variant === "dark" ? "text-text-primary" : "text-text-inverse";
  const subColor = variant === "dark" ? "text-text-secondary" : "text-text-sidebar";

  return (
    <div
      className={cn(
        "flex items-center gap-2 select-none",
        size === "sm" ? "flex-row" : "flex-row",
        className,
      )}
    >
      {/* Cat mascot icon */}
      <div className="flex shrink-0 items-center justify-center">
        <Icon
          icon="hugeicons:cat"
          className={cn(
            variant === "dark" ? "text-text-primary" : "text-text-sidebar-active",
          )}
          width={iconSizes[size]}
          height={iconSizes[size]}
        />
      </div>

      {/* Wordmark */}
      {size !== "sm" && (
        <div className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display font-bold uppercase tracking-tight",
              size === "lg" ? "text-2xl" : "text-lg",
              textColor,
            )}
          >
            Snick
          </span>
          {size === "lg" && (
            <span className={cn("mt-0.5 text-[10px] font-medium tracking-wide", subColor)}>
              Sneak click only!
            </span>
          )}
        </div>
      )}
    </div>
  );
}
