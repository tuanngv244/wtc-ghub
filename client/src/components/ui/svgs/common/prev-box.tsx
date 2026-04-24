interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function PrevBox({ size = 20 }: IconProps) {
  return (
    <svg
      width={56}
      height={37}
      viewBox="0 0 56 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_1416_9181)">
        <path
          d="M48.2431 25.8756C45.946 31.9676 40.116 36 33.6053 36H18C8.05887 36 0 27.9411 0 18C0 8.05887 8.05887 0 18 0H46.4336C52.0254 0 55.8921 5.59035 53.9192 10.8226L48.2431 25.8756Z"
          fill="#ECEEEE"
        />
        <path
          d="M33.6055 35.5H18C8.33501 35.5 0.5 27.665 0.5 18C0.5 8.33502 8.33502 0.5 18 0.5H46.4336C51.6759 0.5 55.3008 5.74129 53.4512 10.6465L47.7754 25.6992C45.5517 31.5964 39.908 35.4999 33.6055 35.5Z"
          stroke="#282A2E"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1416_9181"
          x={0}
          y={0}
          width="55.4409"
          height={37}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx={1} dy={1} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.156863 0 0 0 0 0.164706 0 0 0 0 0.180392 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1416_9181"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1416_9181"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
