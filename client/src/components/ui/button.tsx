import { forwardRef, RefAttributes, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import {
  HugeiconsIcon,
  HugeiconsIconProps,
  IconSvgElement,
} from "@hugeicons/react";

/* =================================================================
   Button — 3D layered depth button from Figma design system

   Design pattern: The button face sits on top of a darker shadow layer,
   creating a physical "press" feel. On active/press, the face translates
   down and the shadow shrinks to zero.

   Variants:
     primary   — Dark grey face (#34373c) on darker shadow (#282a2e)
     secondary — Green face (#09c358) on darker green shadow (#068a3e)
     tertiary  — Sky-blue face (#b4cffe) on blue shadow (#8093b4)
     ghost     — Transparent, text-only
     icon      — Circular icon-only button (e.g. view/eye icon)
   ================================================================= */

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "pink"
  | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconSvgElement;
  iconProps?: HugeiconsIconProps & RefAttributes<SVGSVGElement>;
  iconPosition?: "left" | "right";
  shape?: "circle" | "pill-shape";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-(--color-grey-800) border-black border border-solid text-text-inverse",
    "shadow-[1px_2px_0_1px_var(--color-grey-900)]",
    "hover:brightness-110",
    "active:translate-y-[3px] active:shadow-[0_1px_0_0_var(--color-btn-primary-shadow)]",
  ),
  secondary: cn(
    "bg-(--color-green-500) border-(--color-green-800) border border-solid text-text-inverse",
    "shadow-[1px_2px_0_1px_var(--color-green-700)]",
    "hover:brightness-110",
    "active:translate-y-[3px] active:shadow-[0_1px_0_0_var(--color-btn-secondary-shadow)]",
  ),
  tertiary: cn(
    "bg-(--color-sky-blue-500) border-[#2A63C6] border border-solid text-[#2A63C6]",
    "shadow-[1px_2px_0_1px_#7DA4E7]",
    "hover:brightness-105",
    "active:translate-y-[3px] active:shadow-[0_1px_0_0_var(--color-btn-tertiary-shadow)]",
  ),
  pink: cn(
    "bg-(--color-camelia-50) border-(--color-camelia-500) border border-solid text-camelia-500",
    "shadow-[1px_2px_0_1px_#ffa6b6]",
    "hover:brightness-105",
    "active:translate-y-[3px] active:shadow-[0_1px_0_0_var(--color-btn-tertiary-shadow)]",
  ),
  ghost: cn("bg-transparent text-text-primary", "hover:bg-bg-hover"),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-5 text-xs gap-1.5",
  md: "h-10 px-7 text-sm gap-2",
  lg: "h-14 px-10 text-base gap-2.5",
};

function Button(
  {
    variant = "primary",
    size = "md",
    icon,
    iconProps,
    iconPosition = "right",
    className,
    shape,
    children,
    disabled,
    ...props
  }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      ref={ref}
      className={cn(
        // Base
        "inline-flex items-center justify-center",
        "rounded-full font-pangram",
        "font-bold uppercase tracking-wider text-sm leading-4 text-white text-nowrap",
        "transition-[transform,box-shadow,filter,opacity] duration-150 ease-out",
        "select-none cursor-pointer",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        "disabled:pointer-events-none disabled:opacity-50",
        // Variant
        variantStyles[variant],
        shape !== "circle" ? sizeStyles[size] : "min-w-10 w-10 h-10",
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <HugeiconsIcon
          icon={icon}
          size={children ? 24 : 18}
          color="currentColor"
          strokeWidth={1.5}
          {...iconProps}
        />
      )}
      {children}
      {icon && iconPosition === "right" && (
        <HugeiconsIcon
          icon={icon}
          size={children ? 24 : 18}
          color="currentColor"
          strokeWidth={1.5}
          {...iconProps}
        />
      )}
    </button>
  );
}

const ButtonWithRef = forwardRef(Button);
ButtonWithRef.displayName = "Button";

export { ButtonWithRef as Button };
