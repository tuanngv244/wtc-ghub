import { HandBrushSvg } from "./hand-brush-svg";

interface HandBrushProps {
  width?: number;
  height?: number;
  className?: string;
}

export function SkillsetHandBrush({
  width = 51,
  height = 29,
  className,
}: HandBrushProps) {
  return (
    <HandBrushSvg
      src="/images/assets/skillset-hand-brush.svg"
      id="skillset-hand-brush"
      width={width}
      height={height}
      className={className}
    />
  );
}
