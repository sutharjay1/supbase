import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import {
  FaPencilAlt,
  FaSquare,
  FaCircle,
  FaEraser,
  FaUndo,
  FaRedo,
} from "react-icons/fa";
import ToolButton from "./tool-button";
import {
  Circle,
  Ellipsis,
  MousePointer2,
  Pencil,
  Redo,
  Square,
  StickyNote,
  Type,
  Undo,
} from "lucide-react";

type CanvasState = any;

interface ToolBarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const ToolBar = () => {
  return (
    <div className="absolute left-2 top-[50%] flex h-72 w-14 -translate-y-[50%] flex-col gap-y-4">
      <div className="flex flex-1 flex-col items-center gap-2 rounded-md bg-white px-1.5 py-2 shadow-md">
        <ToolButton
          icon={MousePointer2}
          label="Select"
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          icon={Type}
          label="Type"
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          icon={StickyNote}
          label="Sticky Note"
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          icon={Square}
          label="Rectangle"
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          icon={Circle}
          label="Ellipse"
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          icon={Pencil}
          label="Pen"
          onClick={() => {}}
          isActive={false}
        />
      </div>
      <div className="flex flex-col items-center space-y-1 rounded-md bg-white p-1.5 shadow-md">
        <ToolButton
          icon={Undo}
          label="Undo"
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          icon={Redo}
          label="Redo"
          onClick={() => {}}
          isActive={false}
        />
      </div>
    </div>
  );
};

export const ToolBarSkeleton = () => {
  return (
    <div className="absolute left-2 top-[50%] flex h-72 w-14 -translate-y-[50%] flex-col gap-y-6 rounded-md bg-white shadow-md">
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
