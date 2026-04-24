import { HandBrushSvg } from "./hand-brush-svg";

interface HandBrushProps {
  width?: number;
  height?: number;
  className?: string;
}

export function BrainCrackedHandBrush({
  width = 139,
  height = 45,
  className,
}: HandBrushProps) {
  return (
    <HandBrushSvg
      src="/images/assets/brain-cracked-hand-brush.svg"
      id="brain-cracked-hand-brush"
      width={width}
      height={height}
      className={className}
    />
  );
}
