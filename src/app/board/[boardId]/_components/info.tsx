import AppLogo from "@/components/AppLogo";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Info = () => {
  return (
    <div className="absolute left-2 top-2 flex h-12 items-center rounded-md bg-white px-1.5 shadow-md">
      TODO: Information here
    </div>
  );
};

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className="absolute left-2 top-2 flex h-12 w-[300px] items-center rounded-md bg-white px-1.5 shadow-md">
      <Skeleton className="bg-muted-400 h-full w-full" />
    </div>
  );
};

export default Info;
