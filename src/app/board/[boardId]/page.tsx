import { Room } from "@/components/room";
import Canvas from "./_components/canvas";
import CanvasLoading from "./_components/canvas-loading";

interface BoardProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = ({ params }: BoardProps) => {
  return (
    <div className="h-screen">
      <Room roomId={params.boardId} fallback={<CanvasLoading />}>
        {/* <CollaborativeApp /> */}
        <Canvas boardId={params.boardId} />
      </Room>
    </div>
  );
};

export default BoardIdPage;
