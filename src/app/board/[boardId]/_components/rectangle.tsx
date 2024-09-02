import { RectangleLayer } from "../../../../../types/canvas";

interface RectangleProps {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

const Rectangle = ({ id, layer, onPointerDown }: RectangleProps) => {
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
      fill={"#000"}
      x={0}
      y={0}
      stroke="transparent"
    />
  );
};

export default Rectangle;
