import { cn } from "@/lib/utils";

/* =================================================================
   SectionTitle — Heading with optional badge from Figma

   Used for each landing-page section (e.g. "Our Top Picked",
   "Best IO Games", "Famous Board Games").

   Design: Large display font heading with optional top badge
   and optional right-side control (like ControlSlider).
   ================================================================= */

export interface SectionTitleProps {
  children: React.ReactNode;
  badge?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionTitle({
  children,
  badge,
  description,
  action,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("flex items-end justify-between gap-4", className)}>
      <div className="flex flex-col gap-1">
        {badge && (
          <span className="text-xs font-bold uppercase tracking-wider text-accent-violet">
            ◆ {badge}
          </span>
        )}
        <h2
          className="text-[length:var(--font-size-display-md)] leading-[var(--line-height-display-md)] font-display font-bold tracking-[var(--letter-spacing-display)] text-text-primary"
        >
          {children}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-text-secondary">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
