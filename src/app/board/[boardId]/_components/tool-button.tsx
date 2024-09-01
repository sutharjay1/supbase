"use client";

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import React from "react";

interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled = false,
}: ToolButtonProps) => {
  return (
    <div className="relative mx-4">
      <Hint label={label} side="right" sideOffset={14}>
        <Button
          disabled={isDisabled}
          variant={isActive ? "boardActive" : "board"}
          onClick={onClick}
          size={"icon"}
          // className="flex h-fit w-fit items-center justify-center"
        >
          <Icon className="text-zinc-800" />
        </Button>
      </Hint>
    </div>
  );
};

export default ToolButton;
