"use client";

import { cn } from "@/lib/utils";
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

interface WrapperProps {
  children?: string | ReactNode;
  className?: string;
}

export function SectionWrapper({
  children,
  className,
  ...props
}: WrapperProps & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  return (
    <section className={cn("px-6 mx-auto w-full", className)} {...props}>
      {children}
    </section>
  );
}
