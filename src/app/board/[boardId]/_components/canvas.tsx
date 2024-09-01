"use client";

import React from "react";
import Info from "./info";
import Participants from "./participants";
import ToolBar from "./toolbar";

interface CanvasProps {
  boardId: string;
}

import { useOthers } from "@liveblocks/react/suspense";
import { Room } from "@/components/room";

export function CollaborativeApp() {
  const others = useOthers();
  const userCount = others.length;
  return <div>There are {userCount} other user(s) online</div>;
}

const Canvas = ({ boardId }: CanvasProps) => {
  return (
    <main className="relative h-full w-full flex items-center justify-center touch-none bg-neutral-100">
      <Info />
      <Participants />
      <ToolBar />
      
    </main>
  );
};

export default Canvas;
