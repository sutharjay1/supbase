"use client";

import AppLogo from "@/components/AppLogo";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useRenameModal } from "../../../../../store/use-rename-modal";
import Actions from "@/components/actions";
import { Menu, MoreHorizontal } from "lucide-react";

const font = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

interface InfoProps {
  boardId: string;
}

const TabSeparator = () => {
  return <div className="px-1.5 text-neutral-300">|</div>;
};

const Info = ({ boardId }: InfoProps) => {
  const { onClose, onOpen } = useRenameModal();

  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  if (!data) return <InfoSkeleton />;

  return (
    <div className="absolute left-2 top-2 flex h-fit items-center rounded-md bg-white px-1.5 shadow-md">
      <Hint side="bottom" label="Go to boards" sideOffset={10}>
        <Link href={"/"} className="p-1">
          <div className="flex items-center gap-x-2">
            <AppLogo width={40} height={40} />
            <span className={cn("text-2xl font-semibold", font.className)}>
              Supbase
            </span>
          </div>
        </Link>
      </Hint>
      <TabSeparator />
      <Hint side="bottom" label="Edit title" sideOffset={10}>
        <Button
          variant={"ghost"}
          className="px-2 text-base font-normal"
          onClick={() => onOpen(data?._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions
        id={boardId}
        label="Options"
        side="bottom"
        sideOffset={10}
        title={data.title}
      >
        <div>
          <Hint label="Main Menu" side="bottom" sideOffset={10}>
            <Button size={"icon"} variant={"ghost"}>
              <Menu
                className="opacity-75 transition-opacity hover:opacity-100"
                size={18}
              />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="absolute left-2 top-2 flex h-12 w-80 items-center rounded-md bg-white px-1.5 shadow-md">
      <Skeleton className="bg-muted-400 h-full w-full" />
    </div>
  );
};

export default Info;
