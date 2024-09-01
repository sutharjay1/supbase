"use client";

import { Loader2, X } from "lucide-react";
import { useRenameModal } from "../../../store/use-rename-modal";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "../../../hooks/use-api-mutation";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

const RenameModal = () => {
  const { initialValues, isOpen, onClose, onOpen } = useRenameModal();

  const [title, setTitle] = useState(initialValues.title);

  const { mutate: renameBoard, pending } = useApiMutation(
    api.board.renameBoard,
  );

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const onSubmit = () => {
    renameBoard({ id: initialValues.id, title })
      .then(() => {
        onClose();
        toast.success("Board renamed");
      })
      .catch(() => {
        toast.error("Failed to rename board");
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Board Title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title for your board</DialogDescription>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={pending}
            className="w-full"
            value={title}
            required
            maxLength={60}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Board Title"
          />

          <DialogFooter>
            <DialogClose>
              <div className="flex flex-col space-x-0 space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                {" "}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={pending}
                  onClick={onSubmit}
                >
                  {pending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </Button>
                <Button
                  type="button"
                  className="w-full"
                  onClick={onClose}
                  variant={"outline"}
                >
                  Cancel
                </Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </form>

        {/* <DialogPrimitive.Close className="absolute right-2 top-2 z-20 rounded-md bg-black/5 p-2 opacity-70 ring-offset-background transition-opacity hover:bg-black/10 hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close> */}
      </DialogContent>
    </Dialog>
  );
};

export default RenameModal;
