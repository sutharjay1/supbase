import { Loader2 } from "lucide-react";
import { InfoSkeleton } from "./info";
import { ParticipantsSkeleton } from "./participants";
import { ToolBarSkeleton } from "./toolbar";

const CanvasLoading = () => {
  return (
    <main className="relative flex h-full w-full touch-none items-center justify-center bg-neutral-100">
      <Loader2 className="h-6 w-6 animate-spin" />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolBarSkeleton />
    </main>
  );
};

export default CanvasLoading;
