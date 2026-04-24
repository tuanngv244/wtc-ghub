import { HandBrushSvg } from "./hand-brush-svg";

interface HandBrushProps {
  width?: number;
  height?: number;
  className?: string;
}

export function FamousHandBrush({
  width = 100,
  height = 22,
  className,
}: HandBrushProps) {
  return (
    <HandBrushSvg
      src="/images/assets/famous-hand-brush.svg"
      id="famous-hand-brush"
      width={width}
      height={height}
      className={className}
    />
  );
}
