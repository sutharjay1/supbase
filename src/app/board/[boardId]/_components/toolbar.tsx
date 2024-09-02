import { Skeleton } from "@/components/ui/skeleton";
import {
  Circle,
  MousePointer2,
  Pencil,
  Redo,
  Square,
  StickyNote,
  Type,
  Undo,
} from "lucide-react";
import {
  CanvasMode,
  CanvasState,
  LayerType,
} from "../../../../../types/canvas";
import ToolButton from "./tool-button";

interface ToolBarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const ToolBar = ({
  setCanvasState,
  canvasState: canvasS,
  undo,
  redo,
  canUndo,
  canRedo,
}: ToolBarProps) => {
  return (
    <div className="absolute left-2 top-[50%] flex h-72 w-14 -translate-y-[50%] flex-col gap-y-4">
      <div className="flex flex-1 flex-col items-center gap-2 rounded-md bg-white px-1.5 py-2 shadow-md">
        <ToolButton
          icon={MousePointer2}
          label="Select"
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.None,
              origin: { x: 0, y: 0 },
              current: { x: 0, y: 0 },
            });
          }}
          isActive={
            canvasS.mode === CanvasMode.None ||
            canvasS.mode === CanvasMode.Translating ||
            canvasS.mode === CanvasMode.Pressing ||
            canvasS.mode === CanvasMode.SelectionNet ||
            canvasS.mode === CanvasMode.Resizing
          }
        />
        <ToolButton
          icon={Type}
          label="Type"
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Text,
            });
          }}
          isActive={
            canvasS.mode === CanvasMode.Inserting &&
            canvasS.layerType === LayerType.Text
          }
        />
        <ToolButton
          icon={StickyNote}
          label="Sticky Note"
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Note,
            });
          }}
          isActive={
            canvasS.mode === CanvasMode.Inserting &&
            canvasS.layerType === LayerType.Note
          }
        />
        <ToolButton
          icon={Square}
          label="Rectangle"
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle,
            });
          }}
          isActive={
            canvasS.mode === CanvasMode.Inserting &&
            canvasS.layerType === LayerType.Rectangle
          }
        />
        <ToolButton
          icon={Circle}
          label="Ellipse"
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Ellipse,
            });
          }}
          isActive={
            canvasS.mode === CanvasMode.Inserting &&
            canvasS.layerType === LayerType.Ellipse
          }
        />
        <ToolButton
          icon={Pencil}
          label="Pen"
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Pencil,
            });
          }}
          isActive={canvasS.mode === CanvasMode.Pencil}
        />
      </div>
      <div className="flex flex-col items-center space-y-1 rounded-md bg-white p-1.5 shadow-md">
        <ToolButton
          icon={Undo}
          label="Undo"
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolButton
          icon={Redo}
          label="Redo"
          onClick={redo}
          isDisabled={!canRedo}
        />
      </div>
    </div>
  );
};

export const ToolBarSkeleton = () => {
  return (
    <div className="absolute left-2 top-[50%] flex h-72 w-14 -translate-y-[50%] flex-col space-y-6 rounded-md bg-white shadow-md">
      <div className="flex flex-1 flex-col items-center gap-2 rounded-md bg-white p-4 shadow-md">
        <Skeleton className="bg-muted-400 h-full w-full px-4 py-4" />
      </div>
      <div className="flex flex-col items-center space-y-1 rounded-md bg-white p-1.5 shadow-md">
        <Skeleton className="bg-muted-400 h-full w-full px-4 py-4" />
      </div>
    </div>
  );
};

export default ToolBar;
