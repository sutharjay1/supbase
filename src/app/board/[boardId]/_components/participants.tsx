"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import UserAvatar from "./user-avatar";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { connectionIdToColor } from "@/lib/utils";

const MAX_SHOWN_USERS = 5;

const Participants = () => {
  const users = useOthers();
  const currentUser = useSelf();

  const hasMoreUsers = users.length > MAX_SHOWN_USERS;

  return (
    <div className="absolute right-2 top-2 mx-auto flex h-[3.291rem] w-fit px-2 items-center justify-center rounded-md bg-white shadow-md">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_USERS).map((user) => (
          <UserAvatar
            key={user.connectionId}
            src={user.info?.picture}
            name={user.info?.name}
            fallback={user.info?.name?.[0]}
            borderColor={connectionIdToColor(user.connectionId.toString())}
          />
        ))}

        {currentUser && (
          <UserAvatar
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} - (You)`}
            fallback={currentUser.info?.name?.[0]}
            borderColor={connectionIdToColor(
              currentUser.connectionId.toString(),
            )}
          />
        )}

        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_USERS} more`}
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
    </div>
  );
};

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute right-2 top-2 flex h-12 w-[300px] items-center rounded-md bg-white p-3 shadow-md">
      <Skeleton className="bg-muted-400 h-full w-full" />
    </div>
  );
};

export default Participants;
