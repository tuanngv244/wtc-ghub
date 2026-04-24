interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

export function ArrowLeftIcon({
  width = 12,
  height = 14,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill={color}
        d="M0.235318 6.30653L4.68705 0.247226C4.80124 0.0917977 4.9826 0 5.17546 0H10.5754C11.063 0 11.351 0.546624 11.0752 0.948805L7.3789 6.33927C7.10415 6.73995 7.09519 7.26597 7.35613 7.67579L10.7898 13.0684C11.0467 13.4719 10.7569 14 10.2786 14H4.84511C4.64527 14 4.45828 13.9015 4.34527 13.7367L0.212473 7.70969C-0.0789685 7.28467 -0.0698047 6.72184 0.235318 6.30653Z"
      />
    </svg>
  );
}
