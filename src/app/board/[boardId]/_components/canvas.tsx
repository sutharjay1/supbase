"use client";

import Info from "./info";
import Participants from "./participants";
import ToolBar from "./toolbar";
import { useSelf } from "@liveblocks/react/suspense";

interface CanvasProps {
  boardId: string;
}

const Canvas = ({ boardId }: CanvasProps) => {
  const info = useSelf((me) => me.info);

  return (
    <main className="relative flex h-full w-full touch-none items-center justify-center bg-neutral-100">
      <Info boardId={boardId} />
      <Participants />
      <ToolBar />
    </main>
  );
};

export default Canvas;
