import { SVGProps } from "react";

interface IconProps {
  width?: number;
  height?: number;
}

export function HeartIcon({
  width = 17,
  height = 15,
  ...props
}: IconProps & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.51953 1.92969C10.9834 0.356982 13.333 0.357075 14.7969 1.92969C16.2894 3.53317 16.2894 6.15335 14.7969 7.75684L9.05957 13.9219C8.65206 14.3596 8.01499 14.3595 7.60742 13.9219L1.86914 7.75684C0.376914 6.15339 0.376882 3.53311 1.86914 1.92969C3.33301 0.356967 5.68258 0.357029 7.14648 1.92969L7.78418 2.61426C7.92599 2.76661 8.12488 2.85343 8.33301 2.85352C8.5412 2.85352 8.73996 2.76662 8.88184 2.61426L9.51953 1.92969Z"
        stroke="#FE7891"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
