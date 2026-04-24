import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Button, ButtonVariant } from "./button";

/* =================================================================
   Chip — Category filter pills from Figma design system

   Pill-shaped toggleable filter used in category bars.
   Variants:
     default  — White bg, subtle border
     active   — Accent primary bg, white text
   ================================================================= */

export interface ChipProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  icon?: string;
  onClick?: () => void;
  className?: string;
}

export function Chip({
  children,
  variant,
  icon,
  onClick,
  className,
}: ChipProps) {
  return (
    <Button
      shape="pill-shape"
      variant={variant}
      className={cn(
        "text-sm normal-case leading-4.5 text-grey-800 font-bold bg-white py-0.5 px-2 h-5.5",
        className,
      )}
      onClick={onClick}
    >
      {icon && <Icon icon={icon} width={16} height={16} />}
      {children}
    </Button>
  );
}
