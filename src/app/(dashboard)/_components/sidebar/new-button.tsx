"use client";

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Plus, X } from "lucide-react";
import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

const NewButton = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex aspect-square h-12 w-12 items-center justify-center rounded-full opacity-80 transition-all duration-75 ease-in hover:opacity-100">
            <Hint label="Create Organization">
              <Button size={"icon"}>
                <Plus className="text-zinc-50" />
              </Button>
            </Hint>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-fit border-none bg-transparent p-0 shadow-none">
          <CreateOrganization />
          <DialogPrimitive.Close className="absolute right-2 top-2 z-20 rounded-md bg-black/5 p-2 opacity-70 ring-offset-background transition-opacity hover:bg-black/10 hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewButton;
