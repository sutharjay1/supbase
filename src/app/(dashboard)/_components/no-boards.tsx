import { Button } from "@/components/ui/button";
import Image from "next/image";

const NoBoards = () => {
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
        <Button size="lg">
          <span>Create Board</span>
        </Button>
      </div>
    </div>
  );
};

export default NoBoards;
