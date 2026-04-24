interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function FamilyIcon({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 19 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M17.7923 5.45286L10.8516 0.462876C9.99373 -0.154292 8.82813 -0.154292 7.96963 0.462876L1.02898 5.45286C0.382179 5.91816 0 6.65816 0 7.44656L0 18.4999C0 19.6223 0.925591 20.5329 2.0678 20.5329H16.7541C17.8963 20.5329 18.8219 19.6229 18.8219 18.4999V7.44656C18.8219 6.65876 18.4397 5.91816 17.7929 5.45286H17.7923ZM14.2026 12.0759C13.6899 14.1894 11.7563 15.7614 9.44971 15.7614C7.14313 15.7614 5.2095 14.1894 4.69685 12.0759C4.55839 11.5041 5.00949 10.9572 5.60706 10.9572H13.293C13.8905 10.9572 14.3416 11.5041 14.2032 12.0759H14.2026Z"
        fill={color}
      />
    </svg>
  );
}
