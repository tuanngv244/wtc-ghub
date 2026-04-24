interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function NextBox({ size = 20 }: IconProps) {
  return (
    <svg
      width={62}
      height={37}
      viewBox="0 0 62 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_1416_9184)">
        <path
          d="M6.53163 10.7239C9.23332 4.23063 15.5758 0 22.6087 0H42.0149C51.956 0 60.0149 8.05888 60.0149 18C60.0149 27.9411 51.956 36 42.0149 36H8.00832C2.30142 36 -1.57016 30.1958 0.622152 24.9268L6.53163 10.7239Z"
          fill="#ECEEEE"
        />
        <path
          d="M22.6086 0.5H42.0149C51.6798 0.500006 59.5149 8.33502 59.5149 18C59.5149 27.665 51.6798 35.5 42.0149 35.5H8.00803C2.658 35.4998 -0.970978 30.0587 1.0842 25.1191L6.99338 10.916C9.61749 4.60922 15.7777 0.500044 22.6086 0.5Z"
          stroke="#282A2E"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1416_9184"
          x={0}
          y={0}
          width="61.0149"
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
            result="effect1_dropShadow_1416_9184"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1416_9184"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
