"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Overlay from "./overlay";
import { MoreHorizontal, Option, OptionIcon } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import Footer from "./footer";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import Actions from "@/components/actions";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "../../../../../hooks/use-api-mutation";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import { Id } from "../../../../../convex/_generated/dataModel";

interface BoardCardProps {
  key: string;
  id: string;
  title: string;
  imageUrl: string;
  orgId: string;
  authorName: string;
  authorId: string;
  createdAt: number;
  isFavorite: boolean;
}

const BoardCard = ({
  id,
  title,
  imageUrl,
  orgId,
  authorName,
  authorId,
  createdAt,
  isFavorite,
  key,
}: BoardCardProps) => {
  const { userId } = useAuth();

  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
    api.board.favorite,
  );
  const { mutate: onUnFavorite, pending: pendingUnFavorite } = useApiMutation(
    api.board.unfavorite,
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      onUnFavorite({ id: id as Id<"boards"> }).catch((error) => {
        toast.error("Failed to unfavorite");
      });
    } else {
      onFavorite({ id: id as Id<"boards">, orgId }).catch((error: Error) => {
        toast.error("Failed to favorite");
        console.log(error);
      });
    }
  };

  return (
    <Link href={`/board/${id}`} key={key}>
      <motion.div
        className="group flex aspect-[100/127] flex-col justify-between overflow-hidden rounded-lg border"
        whileHover="hover"
        initial="rest"
        animate="rest"
      >
        <div className="relative flex-1 overflow-hidden bg-amber-50">
          <motion.div
            className="relative h-full w-full"
            variants={{
              rest: { scale: 1 },
            }}
            transition={{ duration: 0.3 }}
          >
            <Image src={imageUrl} alt={title} fill className="object-cover" />
          </motion.div>
          <Overlay />
          <Actions id={id} label="Options" side="right">
            <button className="absolute right-1 top-1 px-3 py-2 opacity-0 outline-none transition-opacity group-hover:opacity-100">
              <MoreHorizontal
                className="text-zinc-50 opacity-75 transition-opacity hover:opacity-100"
                size={18}
              />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disable={pendingFavorite || pendingUnFavorite}
        />
      </motion.div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="flex aspect-[100/127] overflow-hidden rounded-lg border">
      <Skeleton className="h-full w-full object-cover" />
    </div>
  );
};

export default BoardCard;
