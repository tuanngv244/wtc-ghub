import { HandBrushSvg } from "./hand-brush-svg";

interface HandBrushProps {
  width?: number;
  height?: number;
  className?: string;
}

export function OurTopPickedHandBrush({
  width = 138,
  height = 20,
  className,
}: HandBrushProps) {
  return (
    <HandBrushSvg
      src="/images/assets/our-top-picked-hand-brush.svg"
      id="our-top-picked-hand-brush"
      width={width}
      height={height}
      className={className}
    />
  );
}
