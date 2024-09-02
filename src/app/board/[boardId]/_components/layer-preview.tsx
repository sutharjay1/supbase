"use client";

import { useStorage } from "@liveblocks/react/suspense";
import React, { memo } from "react";
import { LayerType } from "../../../../../types/canvas";
import Rectangle from "./rectangle";

interface LayerPreviewProps {
  key: string;
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void; //TODO: fix types
  selectionColor?: string;
}

const LayerPreview = memo(
  ({ key, id, onLayerPointerDown }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) return null;

    switch (layer.type) {
      case LayerType.Rectangle:
        return (
          <Rectangle id={id} layer={layer} onPointerDown={onLayerPointerDown} />
        );
      case LayerType.Ellipse:
        return (
          <>
            <div>Ellipse</div>
          </>
        );
      case LayerType.Path:
        return (
          <>
            <div>Path</div>
          </>
        );
      case LayerType.Text:
        return (
          <>
            <div>Text</div>
          </>
        );
      case LayerType.Note:
        return (
          <>
            <div>Note</div>
          </>
        );
      default:
        console.warn("unknown layer type");
        return null;
    }
  },
);

export default LayerPreview;
