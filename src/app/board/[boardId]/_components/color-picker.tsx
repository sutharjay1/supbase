"use client";

import { Button } from "@/components/ui/button";
import { Color } from "../../../../../types/canvas";
import css from "styled-jsx/css";
import { colorToCSS } from "@/lib/utils";
import Hint from "@/components/hint";
import { Trash } from "lucide-react";

const colors = [
  { r: 110, g: 140, b: 200 },
  { r: 250, g: 150, b: 130 },
  { r: 255, g: 245, b: 100 },
  { r: 180, g: 150, b: 200 },
  { r: 100, g: 200, b: 150 },
  { r: 150, g: 150, b: 150 },
  { r: 100, g: 50, b: 200 },
  { r: 200, g: 50, b: 100 },
  { r: 50, g: 200, b: 100 },
  { r: 200, g: 100, b: 100 },
];

interface ColorPickerProps {
  onColorChange: (color: Color) => void;
}

const ColorPicker = ({ onColorChange }: ColorPickerProps) => {
  return (
    <div className="flex max-w-[200px] flex-wrap items-center gap-2 border-neutral-200">
      {colors.map((color, index) => (
        <ColorButton key={index} onClick={onColorChange} color={color} />
      ))}{" "}
    </div>
  );
};

interface ColorButtonProps {
  onClick: (color: Color) => void;
  key: number | string;
  color: Color;
}

const ColorButton = ({ onClick, color, key }: ColorButtonProps) => {
  console.log(`color: ${colorToCSS(color)}`);
  return (
    <button
      className="flex h-8 w-8 items-center justify-center opacity-100 transition hover:opacity-75"
      onClick={() => onClick(color)}
      key={key}
    >
      <div
        className="h-8 w-8 rounded-md border border-neutral-300"
        style={{
          backgroundColor: colorToCSS(color),
        }}
      />
    </button>
  );
};

export default ColorPicker;
