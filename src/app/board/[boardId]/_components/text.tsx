import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { TextLayer } from "../../../../../types/canvas";
import { cn, colorToCSS } from "@/lib/utils";
import { useMutation } from "@liveblocks/react";

const kalam = Kalam({ subsets: ["latin"], weight: "400" });

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.5;
  const fontSizeBasedOnWidth = width * scaleFactor;
  const fontSizeBasedOnHeight = height * scaleFactor;

  return Math.min(fontSizeBasedOnWidth, fontSizeBasedOnHeight, maxFontSize);
};

interface TextProps {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor: string;
}

const Text = ({ id, layer, onPointerDown, selectionColor }: TextProps) => {
  const { x, y, height, width, type, value, fill } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");

    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
      }}
      className="relative drop-shadow-md"
    >
      <ContentEditable
        html={value?.toString() || "Text"}
        onChange={handleContentChange}
        className={cn(
          "flex h-full w-full items-center justify-center text-center outline-none drop-shadow-md",
          kalam.className,
        )}
        style={{
          fontSize: calculateFontSize(width, height),
          color: fill ? colorToCSS(fill) : "#000",
        }}
      />
    </foreignObject>
  );
};

export default Text;
