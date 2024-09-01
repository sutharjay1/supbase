"use client";

import React from "react";
import EmptySearch from "./empty-search";
import EmptyOrg from "./empty-org";
import NoBoards from "./no-boards";
import EmptyFav from "./empty-fav";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

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
  });

  if (data === undefined) {
    return <div>Loading...</div>;
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

  return <div>{JSON.stringify(data)}</div>;
};

export default BoardList;
