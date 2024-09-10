"use client";

import { memo } from "react";
import { Camera, Color } from "../../../../../types/canvas";
import { useSelf } from "@liveblocks/react";
import { useSelectionBounds } from "../../../../../hooks/use-selection-bounds";

interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    const selectionBounds = useSelectionBounds();

    if (!selectionBounds) return null;

    const x = selectionBounds.x + selectionBounds.width / 2 + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute flex select-none rounded-xl border bg-white p-3 shadow-sm"
        style={{
          left: `${x}px`,
          top: `${y - 14}px`,
          transform: "translateX(-50%) translateY(-100%)", // Center horizontally and position at the top
        }}
      >
        Selection Tools
      </div>
    );
  },
);

export default SelectionTools;
