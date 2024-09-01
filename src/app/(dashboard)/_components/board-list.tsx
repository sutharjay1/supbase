"use client";

import React, { useState } from "react";
import EmptySearch from "./empty-search";
import EmptyOrg from "./empty-org";
import NoBoards from "./no-boards";
import EmptyFav from "./empty-fav";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import BoardCard from "./board-card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "../../../../hooks/use-api-mutation";
import { toast } from "sonner";
import NewBoardButton from "./board-card/new-board-button";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.boards.get, {
    orgId: orgId,
    ...query,
  });

  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl">
          {query.favorites ? "Favorite Boards" : "Team Boards"}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          <NewBoardButton orgId={orgId} disabled={false} />
          {[...Array(9)].map((_, i) => (
            <BoardCard.Skeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data?.length && query.favorites) {
    return <EmptyFav />;
  }

  if (!data?.length) {
    return <NoBoards />;
  }

  return (
    <div>
      <h2 className="text-3xl">
        {query.favorites ? "Favorite Boards" : "Team Boards"}
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <NewBoardButton orgId={orgId} disabled={false} />
        {data?.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            orgId={board.orgId}
            authorName={board.authorName}
            authorId={board.authorId}
            createdAt={board._creationTime}
            isFavorite={board.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardList;
