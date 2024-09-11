"use client";

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useMutation, useSelf } from "@liveblocks/react";
import { BringToFront, SendToBack, Trash } from "lucide-react";
import { memo } from "react";
import { useSelectionBounds } from "../../../../../hooks/use-selection-bounds";
import { Camera, Color } from "../../../../../types/canvas";
import ColorPicker from "./color-picker";
import { useDeleteLayers } from "../../../../../hooks/use-delete-layers";

interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    const moveToBack = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const indices: number[] = [];

        const arr = liveLayerIds.toArray();

        for (let i = 1; i < arr.length; i++) {
          if (selection?.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = 0; i < indices.length; i++) {
          liveLayerIds.move(indices[i], i);
        }
      },
      [selection],
    );

    const moveToFront = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const indices: number[] = [];

        const arr = liveLayerIds.toArray();

        for (let i = 0; i < arr.length; i++) {
          if (selection?.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = indices.length - 1; i >= 0; i--) {
          const index = indices[i];
          liveLayerIds.move(index, arr.length - 1 - (indices.length - 1 - i));
        }
      },
      [selection],
    );

    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");

        setLastUsedColor(fill);

        selection?.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor],
    );

    const selectionBounds = useSelectionBounds();

    if (!selectionBounds) return null;

    const x = selectionBounds.x + selectionBounds.width / 2 + camera.x;
    const y = selectionBounds.y + camera.y;

    // const deleteLayers = useDeleteLayers(selectionBounds);

    return (
      <div
        className="absolute flex select-none rounded-xl border bg-white p-3 shadow-sm"
        style={{
          left: `${x}px`,
          top: `${y - 14}px`,
          transform: "translateX(-50%) translateY(-100%)",
        }}
      >
        <ColorPicker onColorChange={setFill} />
        <div className="flex flex-col gap-y-0.5">
          <Hint label="Bring to front">
            <Button variant="board" size="icon" className="mx-0 px-0">
              <BringToFront className="size-6" onClick={moveToFront} />
            </Button>
          </Hint>
          <Hint label="Send to back">
            <Button variant="board" size="icon" className="mx-0 px-0">
              <SendToBack className="size-6 rotate-180" onClick={moveToBack} />
            </Button>
          </Hint>
        </div>
        <Hint label="Delete">
          <Button
            variant="board"
            size="icon"
            className="mx-0 px-0"
            // onClick={deleteLayers}
          >
            <Trash className="size-6" />
          </Button>
        </Hint>
      </div>
    );
  },
);

export default SelectionTools;
