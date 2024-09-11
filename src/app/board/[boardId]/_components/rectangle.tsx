// import { colorToCSS } from "@/lib/utils";
// import { RectangleLayer } from "../../../../../types/canvas";

// interface RectangleProps {
//   id: string;
//   layer: RectangleLayer;
//   onPointerDown: (e: React.PointerEvent, id: string) => void;
//   selectionColor: string;
// }

// const Rectangle = ({
//   id,
//   layer,
//   onPointerDown,
//   selectionColor,
// }: RectangleProps) => {
//   const { x, y, height, width, fill } = layer;

//   return (
//     <rect
//       className="drop-shadow-md"
//       onPointerDown={(e) => onPointerDown(e, id)}
//       style={{
//         transform: `translate(${x}px, ${y}px)`,
//       }}
//       width={width}
//       height={height}
//       fill={fill ? colorToCSS(fill) : "#000"}
//       x={0}
//       y={0}
//       stroke={selectionColor || "transparent"}
//     />
//   );
// };

// export default Rectangle;

import React, { useState, useCallback } from "react";
import { colorToCSS, getContrastingTextColor } from "@/lib/utils";
import { RectangleLayer } from "../../../../../types/canvas";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useMutation } from "@liveblocks/react";
import { Kalam } from "next/font/google";

const kalam = Kalam({ subsets: ["latin"], weight: "400" });

const MIN_FONT_SIZE = 12; // Minimum font size in pixels

interface RectangleProps {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.5;
  const fontSizeBasedOnWidth = width * scaleFactor;
  const fontSizeBasedOnHeight = height * scaleFactor;
  return Math.max(
    Math.min(fontSizeBasedOnWidth, fontSizeBasedOnHeight, maxFontSize),
    MIN_FONT_SIZE,
  );
};

const Rectangle = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: RectangleProps) => {
  const { x, y, height, width, fill } = layer;
  const [isEditing, setIsEditing] = useState(false);

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
  }, []);

  const fontSize = calculateFontSize(width, height);

  return (
    <g
      onPointerDown={(e) => onPointerDown(e, id)}
      onDoubleClick={handleDoubleClick}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      <rect
        className="drop-shadow-md"
        width={Math.max(width, MIN_FONT_SIZE * 2)}
        height={Math.max(height, MIN_FONT_SIZE * 2)}
        fill={fill ? colorToCSS(fill) : "#000"}
        stroke={selectionColor || "transparent"}
        strokeWidth={selectionColor ? 1 : 0}
      />
      {isEditing ? (
        <foreignObject
          width={Math.max(width, MIN_FONT_SIZE * 2)}
          height={Math.max(height, MIN_FONT_SIZE * 2)}
        >
          <ContentEditable
            html={layer.value || ""}
            onChange={handleContentChange}
            onBlur={handleBlur}
            className={`flex h-full w-full items-center justify-center text-center outline-none ${kalam.className}`}
            style={{
              fontSize: `${fontSize}px`,
              color: fill ? getContrastingTextColor(fill) : "#000",
              backgroundColor: "transparent",
            }}
          />
        </foreignObject>
      ) : (
        <text
          x={width / 2}
          y={height / 2}
          dominantBaseline="middle"
          textAnchor="middle"
          fill={fill ? getContrastingTextColor(fill) : "#000"}
          style={{
            fontSize: `${fontSize}px`,
            fontFamily: kalam.style.fontFamily,
          }}
        >
          {layer.value || ""}
        </text>
      )}
    </g>
  );
};

export default Rectangle;
