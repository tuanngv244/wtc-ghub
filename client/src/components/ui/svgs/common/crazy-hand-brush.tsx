import { HandBrushSvg } from "./hand-brush-svg";

interface HandBrushProps {
  width?: number;
  height?: number;
  className?: string;
}

export function CrazyHandBrush({
  width = 99,
  height = 18,
  className,
}: HandBrushProps) {
  return (
    <HandBrushSvg
      src="/images/assets/crazy-hand-brush.svg"
      id="crazy-hand-brush"
      width={width}
      height={height}
      className={className}
    />
  );
}
