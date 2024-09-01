"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link2, Pencil, Trash, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "../../hooks/use-api-mutation";
import { api } from "../../convex/_generated/api";
import ConfirmModal from "./confirm-modal";
import { Button } from "./ui/button";
import { useRenameModal } from "../../store/use-rename-modal";
import { useRouter } from "next/navigation";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  align?: DropdownMenuContentProps["align"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  alignOffset?: DropdownMenuContentProps["alignOffset"];
  id: string;
  label?: string;
  title: string;
}

const Actions = ({
  children,
  side = "right",
  align = "start",
  sideOffset = 0,
  alignOffset = 0,
  id,
  label,
  title,
}: ActionsProps) => {
  const { mutate: removeBoard, pending } = useApiMutation(api.board.remove);

  const { isOpen, onOpen, onClose, initialValues } = useRenameModal();

  const router = useRouter();

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => {
        toast.success("Link copied");
      })
      .catch(() => {
        toast.error("Failed to copy link");
      });
  };

  const onRemoveBoard = () => {
    removeBoard({ id })
      .then(() => {
        toast.success("Board deleted");
        router.push("/");
      })
      .catch(() => {
        toast.error("Failed to delete board");
      });
  };

  const onRename = () => {
    console.log("rename");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        id={id}
        className="w-60"
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuItem onClick={onCopyLink}>
          <Link2 className="mr-2 h-4 w-4" />
          Copy board link
        </DropdownMenuItem>{" "}
        <DropdownMenuItem onClick={() => onOpen(id, title!)}>
          <Pencil className="mr-2 h-4 w-4" />
          Rename
        </DropdownMenuItem>
        <ConfirmModal
          onConfirm={onRemoveBoard}
          header="Delete board"
          description="Are you sure you want to delete this board?"
          disabled={pending}
        >
          <Button
            variant={"ghost"}
            className="w-full cursor-pointer justify-start p-3 text-sm font-normal"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </ConfirmModal>{" "}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
