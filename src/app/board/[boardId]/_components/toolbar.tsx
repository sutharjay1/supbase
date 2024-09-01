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

const ToolBar = () => {
  return (
    <div className="absolute left-2 top-[50%] flex h-12 -translate-y-[50%] flex-col gap-y-4">
      <div className="flex flex-col items-center gap-y-2 rounded-md bg-white p-2 shadow-md">
        <Button
          size={"icon"}
          aria-label="Pencil"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white"
        >
          <FaPencilAlt />
        </Button>
        <Button
          size={"icon"}
          aria-label="Square"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white"
        >
          <FaSquare />
        </Button>
        <Button
          size={"icon"}
          aria-label="Circle"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white"
        >
          <FaCircle />
        </Button>
        <Button
          size={"icon"}
          aria-label="Eraser"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white"
        >
          <FaEraser />
        </Button>
      </div>
      <div className="flex flex-col items-center space-y-1 rounded-md bg-white p-1.5 shadow-md">
        <Button
          size={"icon"}
          aria-label="Undo"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white"
        >
          <FaUndo />
        </Button>
        <Button
          size={"icon"}
          aria-label="Redo"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white"
        >
          <FaRedo />
        </Button>
      </div>
    </div>
  );
};

ToolBar.Skeleton = function ToolBarSkeleton() {
  return (
    <div className="absolute left-2 top-[50%] flex h-72 w-14 -translate-y-[50%] flex-col gap-y-4 bg-white rounded-md shadow-md">
      <Skeleton className="bg-muted-400 h-full w-full px-4 py-4" />
    </div>
  );
};

export default ToolBar;
