import { Loader2 } from "lucide-react";
import Info from "./info";
import Participants from "./participants";
import ToolBar from "./toolbar";

const CanvasLoading = () => {
  return (
    <main className="relative flex h-full w-full touch-none items-center justify-center bg-neutral-100">
      <Loader2 className="h-6 w-6 animate-spin" />
      <Info.Skeleton />
      <Participants.Skeleton />
      <ToolBar.Skeleton />
    </main>
  );
};

export default CanvasLoading;
