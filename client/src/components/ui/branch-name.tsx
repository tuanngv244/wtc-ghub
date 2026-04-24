import { cn } from "@/lib/utils";

/* =================================================================
   BranchName — Category label badge from Figma

   Small colored label showing a category/branch name.
   Used in section headers like "◆ Card Game", "◆ Strategy".
   ================================================================= */

export interface BranchNameProps {
  children: React.ReactNode;
  className?: string;
}

export function BranchName({ children, className }: BranchNameProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5",
        "text-xs font-bold uppercase tracking-wider",
        "text-accent-violet",
        className,
      )}
    >
      <span className="text-base leading-none">◆</span>
      {children}
    </span>
  );
}
