"use client";

import { useOthersConnectionIds } from "@liveblocks/react/suspense";
import { memo } from "react";
import Cursor from "./cursor";

const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((id) => (
        <Cursor key={id} connectionId={id} />
      ))}
    </>
  );
};

const CursorsPresence = memo(() => {
  return (
    <>
      {/*
        TODO: Draft Pencil
        */}
      <Cursors />
    </>
  );
});

export default CursorsPresence;
