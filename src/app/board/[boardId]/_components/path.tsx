import { getSvgPathFromStroke } from "@/lib/utils";
import { PathLayer } from "../../../../../types/canvas";
import getStroke from "perfect-freehand";

interface PathProps {
  x: number;
  y: number;
  points: number[][];
  fill: string;
  onPointerDown?: (e: React.PointerEvent) => void;
  selectionColor?: string;
  stroke?: string;
}

const Path = ({
  x,
  y,
  points,
  fill,
  onPointerDown,
  selectionColor,
  stroke,
}: PathProps) => {
  return (
    <path
      className="drop-shadow-md"
      onPointerDown={onPointerDown}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 5,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5,
          // easing: 'ease-in-out',
          //   startAt: { x, y },
        }),
      )}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={x}
      y={y}
      fill={fill || selectionColor}
      stroke={stroke}
      strokeWidth={1}
    />
  );
};

export default Path;
