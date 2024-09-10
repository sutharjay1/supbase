import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Camera, Color, Point, Side, XYWH } from "../../types/canvas";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const COLORS = [
  "#F56565", "#ED8936", "#ECC94B", "#48BB78", "#38B2AC", "#4299E1", "#667EEA",
  "#9F7AEA", "#ED64A6", "#E53E3E", "#FC8181", "#B83280", "#D69E2E", "#F6AD55",
  "#38A169", "#319795", "#3182CE", "#805AD5", "#D53F8C", "#DD6B20", "#CBD5E0",
  "#F687B3", "#68D391", "#4FD1C5", "#63B3ED", "#A0AEC0", "#B794F4", "#F56565",
  "#ED8936", "#ECC94B", "#48BB78", "#38B2AC", "#4299E1", "#667EEA", "#9F7AEA",
  "#ED64A6", "#E53E3E", "#FC8181", "#F6E05E", "#C6F6D5", "#81E6D9", "#90CDF4"
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export function connectionIdToColor(connectionId: string) {
  const hash = hashString(connectionId);
  return COLORS[hash % COLORS.length];
}


export function pointerEventToCanvasPoint(e: React.PointerEvent, camera: Camera) {
  return {
    x: Math.round(e.clientX - camera.x),
    y: Math.round(e.clientY - camera.y)
  }
}

export function colorToCSS(color: Color) {
  return `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;
}

export function resizeBounds(bounds: XYWH, corner: Side, point: Point): XYWH {
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height
  };

  if ((corner & Side.Left) === Side.Left) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }

  if ((corner & Side.Right) === Side.Right) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);
  }

  if ((corner & Side.Top) === Side.Top) {
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }

  if ((corner & Side.Bottom) === Side.Bottom) {
    result.y = Math.min(point.y, bounds.y)
    result.height = Math.abs(point.y - bounds.y);
  }

  return result
}