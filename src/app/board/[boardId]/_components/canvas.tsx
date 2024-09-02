"use client";

import { useCallback, useState } from "react";
import Info from "./info";
import Participants from "./participants";
import ToolBar from "./toolbar";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useSelf,
  useStorage,
} from "@liveblocks/react/suspense";
import { nanoid } from "nanoid";
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
} from "../../../../../types/canvas";
import CursorsPresence from "./cursors-presence";
import { pointerEventToCanvasPoint } from "@/lib/utils";
import { LiveObject } from "@liveblocks/client";
import LayerPreview from "./layer-preview";

interface CanvasProps {
  boardId: string;
}

const MAX_LAYERS = Number(process.env.NEXT_PUBLIC_MAX_LAYERS) || 100;

const Canvas = ({ boardId }: CanvasProps) => {
  const info = useSelf((me) => me.info);

  const layerIds = useStorage((root) => root.layerIds);

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
    origin: { x: 0, y: 0 },
  });

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    a: 0,
    b: 0,
    g: 0,
    r: 0,
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Note
        | LayerType.Text,
      position: Point,
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });
      liveLayerIds.push(layerId);

      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None, origin: { x: 0, y: 0 } });
    },

    [lastUsedColor],
  );

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera({ x: camera.x - e.deltaX, y: camera.y - e.deltaY });
  }, []);

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e, camera);

      setMyPresence({ cursor: current });
    },
    [],
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const onPointerUp = useMutation(
    ({ setMyPresence }, e) => {
      const point = pointerEventToCanvasPoint(e, camera);

      console.log({
        point,
        mode: canvasState.mode,
      });

      if (canvasState.mode === CanvasMode.Inserting) {
        if (
          canvasState.layerType === LayerType.Rectangle ||
          canvasState.layerType === LayerType.Ellipse ||
          canvasState.layerType === LayerType.Text ||
          canvasState.layerType === LayerType.Note
        ) {
          insertLayer(canvasState.layerType, point);
        }
      } else {
        setCanvasState({ mode: CanvasMode.None, origin: { x: 0, y: 0 } });
      }

      history.resume();
    },
    [camera, canvasState, insertLayer, history],
  );

  return (
    <main className="relative flex h-full w-full touch-none items-center justify-center bg-neutral-100">
      <Info boardId={boardId} />
      <Participants />
      <ToolBar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />

      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
      >
        <g
          style={{
            transform: `translateX(${camera.x}px) translateY(${camera.y}px)`,
          }}
        >
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={() => {}}
              selectionColor={"#000"}
            />
          ))}
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
