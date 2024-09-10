import { colorToCSS } from "@/lib/utils";
import { RectangleLayer } from "../../../../../types/canvas";

interface RectangleProps {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor: string;
}

const Rectangle = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: RectangleProps) => {
  const { x, y, height, width, fill } = layer;

  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      width={width}
      height={height}
      fill={fill ? colorToCSS(fill) : "#ccc"}
      x={0}
      y={0}
      stroke={selectionColor || "transparent"}
    />
  );
};

export default Rectangle;
