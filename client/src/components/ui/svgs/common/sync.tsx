import { SVGProps } from "react";

interface IconProps {
  width?: number;
  height?: number;
  className?: string;
}

export function SyncIcon({
  width = 14,
  height = 17,
  ...props
}: IconProps & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.14286 1.00027L10.0264 3.31834C9.13796 2.79833 8.10379 2.50027 7 2.50027C3.68629 2.50027 1 5.18656 1 8.50027C1 9.59313 1.29218 10.6178 1.80269 11.5003M4.85714 16.0003L3.97355 13.6822C4.86202 14.2022 5.8962 14.5003 7 14.5003C10.3137 14.5003 13 11.814 13 8.50027C13 7.40741 12.7078 6.38279 12.1973 5.50027"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
