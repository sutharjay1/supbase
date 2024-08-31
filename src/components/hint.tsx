import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export interface HintProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
}

const Hint = ({
  label,
  children,
  side = "right",
  align = "center",
  sideOffset = 10,
  alignOffset = 10,
}: HintProps) => {
  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        sideOffset={sideOffset}
        align={align}
        className="border-zinc-900 bg-zinc-900 text-zinc-50"
        alignOffset={alignOffset}
      >
        <p className="font-semibold capitalize">{label}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default Hint;
