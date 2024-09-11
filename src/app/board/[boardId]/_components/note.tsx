// import { Kalam } from "next/font/google";
// import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
// import { NoteLayer, TextLayer } from "../../../../../types/canvas";
// import { cn, colorToCSS, getContrastingTextColor } from "@/lib/utils";
// import { useMutation } from "@liveblocks/react";

// const kalam = Kalam({ subsets: ["latin"], weight: "400" });

// const calculateFontSize = (width: number, height: number) => {
//   const maxFontSize = 96;
//   const scaleFactor = 0.5;
//   const fontSizeBasedOnWidth = width * scaleFactor;
//   const fontSizeBasedOnHeight = height * scaleFactor;

//   return Math.min(fontSizeBasedOnWidth, fontSizeBasedOnHeight, maxFontSize);
// };

// interface NoteProps {
//   id: string;
//   layer: NoteLayer;
//   onPointerDown: (e: React.PointerEvent, id: string) => void;
//   selectionColor: string;
// }

// const Note = ({ id, layer, onPointerDown, selectionColor }: NoteProps) => {
//   const { x, y, height, width, type, value, fill } = layer;

//   const updateValue = useMutation(({ storage }, newValue: string) => {
//     const liveLayers = storage.get("layers");

//     liveLayers.get(id)?.set("value", newValue);
//   }, []);

//   const handleContentChange = (e: ContentEditableEvent) => {
//     updateValue(e.target.value);
//   };

//   return (
//     <foreignObject
//       x={x}
//       y={y}
//       width={width}
//       height={height}
//       onPointerDown={(e) => onPointerDown(e, id)}
//       style={{
//         outline: selectionColor ? `1px solid ${selectionColor}` : "none",
//         backgroundColor: fill ? colorToCSS(fill) : "#000",
//       }}
//       className={cn("relative shadow-md drop-shadow-xl", "bg-amber-200")}
//     >
//       <ContentEditable
//         html={value?.toString() || "Text"}
//         onChange={handleContentChange}
//         className={cn(
//           "flex h-full w-full items-center justify-center text-center outline-none",
//           kalam.className,
//         )}
//         style={{
//           fontSize: calculateFontSize(width, height),
//           color: fill ? getContrastingTextColor(fill) : "#000",
//         }}
//       />
//     </foreignObject>
//   );
// };

// export default Note;

import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { NoteLayer } from "../../../../../types/canvas";
import { cn, colorToCSS, getContrastingTextColor } from "@/lib/utils";
import { useMutation } from "@liveblocks/react";

const kalam = Kalam({ subsets: ["latin"], weight: "400" });

const MIN_FONT_SIZE = 12;

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

interface NoteProps {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

const Note = ({ id, layer, onPointerDown, selectionColor }: NoteProps) => {
  const { x, y, height, width, value, fill } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  const backgroundColor = fill ? colorToCSS(fill) : "#000";

  return (
    <foreignObject
      x={x}
      y={y}
      width={Math.max(width, MIN_FONT_SIZE * 2)}
      height={Math.max(height, MIN_FONT_SIZE * 2)}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
      }}
      className={cn("relative bg-amber-200 shadow-md drop-shadow-2xl")}
    >
      <div
        className={cn(
          "flex h-full w-full items-center justify-center text-center",
          kalam.className,
        )}
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <ContentEditable
          html={value?.toString() || "Text"}
          onChange={handleContentChange}
          className={cn(
            "h-full w-full outline-none",
            "flex items-center justify-center",
          )}
          style={{
            fontSize: calculateFontSize(width, height),
            color: fill ? getContrastingTextColor(fill) : "#000",
            backgroundColor: "transparent",
          }}
        />
      </div>
    </foreignObject>
  );
};

export default Note;
