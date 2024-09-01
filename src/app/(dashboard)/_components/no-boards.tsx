"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { api } from "../../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { useOrganization } from "@clerk/nextjs";
import { useState } from "react";
import { useApiMutation } from "../../../../hooks/use-api-mutation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const NoBoards = () => {
  const { organization } = useOrganization();
  const { mutate: create, pending } = useApiMutation(api.board.create);

  const [untitledCount, setUntitledCount] = useState(0);

  const handleCreateBoard = async () => {
    if (!organization) return;

    setUntitledCount((prevCount) => prevCount + 1);
    create({
      orgId: organization.id,
      title: `Untitled ${untitledCount}`,
    })
      .then((id) => {
        toast.success("Board created");
        // TODO: Navigate to new board
      })
      .catch((error) => {
        toast.error("Failed to create board");
      });
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image
        src="https://illustrations.popsy.co/amber/man-riding-a-rocket.svg"
        width={200}
        height={200}
        alt="Empty organization"
        className="h-2/5 w-auto"
      />
      <h2 className="mt-6 text-2xl font-semibold">Create your first board</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button size="lg" onClick={handleCreateBoard}>
          {pending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Creating...</span>
            </>
          ) : (
            <span>Create Board</span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default NoBoards;
