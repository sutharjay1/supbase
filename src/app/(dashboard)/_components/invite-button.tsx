"use client";

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { OrganizationProfile } from "@clerk/nextjs";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Plus, X } from "lucide-react";

const InviteButton = () => {
  return (
    <Dialog>
      <Hint label="Invite" side="bottom">
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            <Plus className="text-zinc-800" />
            Invite Members
          </Button>
        </DialogTrigger>
      </Hint>

      <DialogContent className="max-w-fit border-none bg-transparent p-0 shadow-none">
        <OrganizationProfile />
        <DialogPrimitive.Close className="absolute right-2 top-1.5 z-20 rounded-md bg-black/5 p-2 opacity-70 ring-offset-background transition-opacity hover:bg-black/10 hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground lg:top-2">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogContent>
    </Dialog>
  );
};

export default InviteButton;
