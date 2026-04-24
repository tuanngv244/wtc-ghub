import { HandBrushSvg } from "./hand-brush-svg";

interface HandBrushProps {
  width?: number;
  height?: number;
  className?: string;
}

export function BestIoHandBrush({
  width = 112,
  height = 22,
  className,
}: HandBrushProps) {
  return (
    <HandBrushSvg
      src="/images/assets/best-io-hand-brush.svg"
      id="best-io-hand-brush"
      width={width}
      height={height}
      className={className}
    />
  );
}
