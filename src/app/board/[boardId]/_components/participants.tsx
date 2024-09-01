import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Participants = () => {
  return (
    <div className="absolute right-2 top-2 flex h-12 items-center rounded-md bg-white p-3 shadow-md">
      Participants
    </div>
  );
};

Participants.Skeleton = function ParticipantsSkeleton() {
  return (
    <div className="absolute right-2 top-2 flex h-12 w-[300px] items-center rounded-md bg-white p-3 shadow-md">
      <Skeleton className="bg-muted-400 h-full w-full" />
    </div>
  );
};

export default Participants;
