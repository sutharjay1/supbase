import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  isFavorite: boolean;
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  onClick: () => void;
  disable: boolean;
}

const Footer = ({
  isFavorite,
  title,
  authorLabel,
  createdAtLabel,
  onClick,
  disable,
}: FooterProps) => {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    onClick();
  };

  return (
    <div className="relative bg-zinc-50 p-3">
      <p className="max-w-sm truncate text-sm">{title}</p>
      <motion.p
        className="hidden truncate text-sm text-muted-foreground group-hover:flex duration-75"
        variants={{
          rest: { opacity: 0, y: 10 },
          hover: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.3 }}
      >
        {authorLabel}, {createdAtLabel}
      </motion.p>
      <Button
        variant={"ghost"}
        size={"icon"}
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground opacity-0 transition group-hover:opacity-100",
          disable && "cursor-not-allowed opacity-75",
        )}
        disabled={disable}
        onClick={handleClick}
      >
        <Star
          className={cn("h-4 w-4", isFavorite && "fill-rose-600 text-rose-600")}
        />
      </Button>
    </div>
  );
};

export default Footer;
