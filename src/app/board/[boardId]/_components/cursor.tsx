"use client";

import { connectionIdToColor } from "@/lib/utils";
import { useOther } from "@liveblocks/react/suspense";
import { MousePointer2 } from "lucide-react";
import React, { memo } from "react";

interface CursorProps {
  connectionId: number;
  key: number;
}

const Cursor = memo(({ connectionId, key }: CursorProps) => {
  const info = useOther(connectionId, (user) => user?.info);
  const cursor = useOther(connectionId, (user) => user?.presence.cursor);

  const name = info?.name ?? "Teammate";

  if (!cursor) {
    return null;
  }

  const { x, y } = cursor;

  return (
    <foreignObject
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
      height={50}
      width={name.length * 10 + 24}
      className="relative drop-shadow-md"
    >
      <MousePointer2
        className="h-6 w-6"
        style={{
          fill: connectionIdToColor(connectionId.toString()),
          color: connectionIdToColor(connectionId.toString()),
        }}
      />
      <div
        className="absolute left-5 rounded-md px-1.5 py-0.5 text-xs font-semibold text-zinc-50"
        style={{
          backgroundColor: connectionIdToColor(connectionId.toString()),
        }}
      >
        {name}
      </div>
    </foreignObject>
  );
});

Cursor.displayName = "Cursor";

export default Cursor;
