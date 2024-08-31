import React from "react";
import NewButton from "./new-button";
import List from "./list";

const SideBar = () => {
  return (
    <>
      <aside className="fixed left-0 z-[1] mx-auto flex h-full flex-col gap-4 bg-rose-400 p-1 pt-3 text-zinc-50 sm:p-2 sm:pt-3 lg:p-3">
        <List />
        <NewButton />
      </aside>
    </>
  );
};

export default SideBar;
