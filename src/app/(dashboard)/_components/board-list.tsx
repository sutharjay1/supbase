"use client";

import React from "react";
import EmptySearch from "./empty-search";
import EmptyOrg from "./empty-org";
import NoBoards from "./no-boards";
import EmptyFav from "./empty-fav";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = [];
  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data?.length && query.favorites) {
    return <EmptyFav />;
  }

  if (!data?.length) {
    return <NoBoards />;
  }

  return <div></div>;
};

export default BoardList;
