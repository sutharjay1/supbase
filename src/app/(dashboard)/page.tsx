"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useOrganization, useUser } from "@clerk/nextjs";
import Image from "next/image";
import EmptyOrg from "./_components/empty-org";
import BoardList from "./_components/board-list";

interface DashboardPageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
  const { organization } = useOrganization();

  return (
    <div className="h-[calc(100vh-80px)] flex-1 p-6">
      {JSON.stringify(searchParams)}
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={searchParams} />
      )}
    </div>
  );
};

export default DashboardPage;
