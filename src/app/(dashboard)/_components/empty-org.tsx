import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

const EmptyOrg = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image
        src="https://illustrations.popsy.co/yellow/falling.svg"
        width={200}
        height={200}
        alt="Empty organization"
        className="h-2/5 w-auto"
      />
      <h2 className="mt-6 text-2xl font-semibold">Welcome to Boards</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Create an organization to get started
      </p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" size={"lg"}>
              Create Organization
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-fit border-none bg-transparent p-0 shadow-none">
            <CreateOrganization />
            <DialogPrimitive.Close className="absolute right-2 top-2 z-20 rounded-md bg-black/5 p-2 opacity-70 ring-offset-background transition-opacity hover:bg-black/10 hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EmptyOrg;
