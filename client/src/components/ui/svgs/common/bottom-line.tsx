import { SVGProps } from "react";

interface IconProps {
  width?: number;
  height?: number;
}

export function BottomLine({
  width = 69,
  height = 5,
  ...props
}: IconProps & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 69 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.408203 2.68086C23.0247 1.24971 45.8041 0.490359 68.5916 0.408264"
        stroke="black"
        strokeWidth="0.628723"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="84.06 0.05"
      />
      <path
        d="M13.1187 3.52502C27.8509 2.8286 42.6501 2.50434 57.4435 2.55223"
        stroke="black"
        strokeWidth="0.628723"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="54.62 0.05"
      />
    </svg>
  );
}
