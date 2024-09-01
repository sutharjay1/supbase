import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
