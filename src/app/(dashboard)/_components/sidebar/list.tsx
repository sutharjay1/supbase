"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect } from "react";
import Item from "./item";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import qs from "query-string";

const List = () => {
  const router = useRouter();

  const { userMemberships, isLoaded } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const { organization } = useOrganization();

  useEffect(() => {
    if (organization) {
      const orgId = organization.id.replace("org_", "");

      // router.push(`/org/${orgId}`);
    }
  }, [organization]);

  if (!isLoaded) {
    // Show skeleton loader while loading
    return (
      <ul className="mx-auto space-y-4">
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="h-40 w-40 rounded-xl" />
        ))}
      </ul>
    );
  }

  if (!userMemberships.data?.length) return null;

  return (
    <ul className="mx-auto space-y-4">
      {userMemberships.data.map((membership) => (
        <li key={membership.organization.id}>
          <Item
            id={membership.organization.id}
            name={membership.organization.name}
            imageUrl={membership.organization.imageUrl}
          />
        </li>
      ))}
    </ul>
  );
};

export default List;
