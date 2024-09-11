// import { shallow, useSelf, useStorage } from "@liveblocks/react";
// import { Layer, XYWH } from "../types/canvas";

// const boundingBox = (layers: Layer[]): XYWH | null => {
//     const first = layers[0];

//     if (!first) return null;

//     let left = first.x;
//     let top = first.y;
//     let right = first.x + first.width;
//     let bottom = first.y + first.height;

//     for (let i = 1; i < layers.length; i++) {
//         const { x, y, width, height } = layers[i];


//         if (left < x) left = x;

//         if (top < y) top = y;

//         if (right > x + width) right = x + width;

//         if (bottom > y + height) bottom = y + height;

//     }

//     return {
//         x: left,
//         y: top,
//         width: right - left,
//         height: bottom - top,
//     }
// }

// export const useSelectionBounds = () => {
//     const selection = useSelf((me) => me.presence.selection);

//     return useStorage((root) => {
//         const selectedLayers = selection?.map((layerId) => root.layers.get(layerId)!).filter(Boolean) as Layer[];
//         return boundingBox(selectedLayers);
//     }, shallow);
// }

import { shallow, useSelf, useStorage } from "@liveblocks/react";
import { Layer, XYWH } from "../types/canvas";

const MIN_FONT_SIZE = 12; // Minimum font size in pixels
const MIN_DIMENSIONS = MIN_FONT_SIZE * 2; // Minimum dimensions to accommodate the font size

const boundingBox = (layers: Layer[]): XYWH | null => {
    if (layers.length === 0) return null;

    let left = Infinity;
    let top = Infinity;
    let right = -Infinity;
    let bottom = -Infinity;

    for (const layer of layers) {
        left = Math.min(left, layer.x);
        top = Math.min(top, layer.y);
        right = Math.max(right, layer.x + Math.max(layer.width, MIN_DIMENSIONS));
        bottom = Math.max(bottom, layer.y + Math.max(layer.height, MIN_DIMENSIONS));
    }

    const width = Math.max(right - left, MIN_DIMENSIONS);
    const height = Math.max(bottom - top, MIN_DIMENSIONS);

    return {
        x: left,
        y: top,
        width,
        height,
    };
};

export const useSelectionBounds = () => {
    const selection = useSelf((me) => me.presence.selection);
    return useStorage((root) => {
        const selectedLayers = selection
            ?.map((layerId) => root.layers.get(layerId))
            .filter(Boolean) as Layer[];
        return boundingBox(selectedLayers);
    }, shallow);
};
