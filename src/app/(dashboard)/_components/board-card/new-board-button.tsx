"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useOrganization } from "@clerk/nextjs";
import { Loader2, Plus } from "lucide-react";
import React, { useState } from "react";
import { useApiMutation } from "../../../../../hooks/use-api-mutation";
import { toast } from "sonner";
import { api } from "../../../../../convex/_generated/api";
import { useRouter } from "next/navigation";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const router = useRouter();
  const { organization } = useOrganization();
  const { mutate: create, pending } = useApiMutation(api.board.create);

  const [untitledCount, setUntitledCount] = useState<number>(1);

  const handleCreateBoard = async () => {
    setUntitledCount((prevCount) => prevCount + 1);
    if (!organization) return;

    create({
      orgId: organization.id,
      title: `Untitled ${untitledCount}`,
    })
      .then((id) => {
        toast.success("Board created");
        // router.push(`/board/${id}`);
        // console.log(id);
      })
      .catch((error) => {
        toast.error("Failed to create board");
      });
  };

  return (
    <div className="group flex aspect-[100/127] flex-col justify-between overflow-hidden rounded-lg border">
      <div className="relative flex-1 bg-amber-100 p-1 hover:bg-amber-100/90">
        <Button
          className={cn(
            "h-full w-full border border-dashed border-zinc-900 bg-amber-100 hover:bg-amber-100/90 hover:text-accent-foreground",
            disabled && "cursor-not-allowed opacity-75",
          )}
          disabled={disabled}
          onClick={handleCreateBoard}
        >
          <span className="flex flex-col items-center justify-center space-y-4 text-accent-foreground">
            {pending ? (
              <>
                <Loader2 className="h-10 w-10 animate-spin" />
                <p className="text-sm font-light text-zinc-800">Creating...</p>
              </>
            ) : (
              <>
                <Plus className="h-12 w-12 stroke-1 text-zinc-800" />
                <p className="text-sm font-light text-zinc-800">New Board</p>
              </>
            )}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default NewBoardButton;
