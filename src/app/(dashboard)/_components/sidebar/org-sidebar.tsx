"use client";

import ResponsiveComponent from "@/components/AnimationPresence";
import AppLogo from "@/components/AppLogo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher, useOrganization } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const font = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

const OrgButton = ({
  label,
  icon,
  favorites = false,
  href,
}: {
  label: React.ReactNode;
  icon: React.ReactNode;
  favorites: boolean;
  href: {
    pathname: string;
    query?: {
      [key: string]: string | string[] | number | boolean | undefined;
    };
  };
}) => {
  return (
    <Link href={href}>
      <Button
        className="flex w-full items-center justify-start px-4 font-normal"
        size="lg"
        variant={favorites ? "outline" : "default"}
      >
        {icon}
        <span className="font-medium">{label}</span>
      </Button>
    </Link>
  );
};

const OrgSideBar = () => {
  const { organization } = useOrganization();

  const searchParams = useSearchParams();

  const favorites = searchParams.get("favorites");

  console.log(favorites);

  return (
    <>
      <div className="mx-auto hidden w-52 flex-col items-center space-y-6 px-5 lg:flex">
        <Link href={"/"} className="pt-3">
          <div className="flex items-center gap-x-2">
            <AppLogo width={40} height={40} />
            <span className={cn("text-2xl font-semibold", font.className)}>
              Supbase
            </span>
          </div>
        </Link>
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              },
              organizationSwitcherTrigger: {
                padding: "6px",
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #E5E7E8",
                justifyContent: "space-between",
                backgroundColor: "#fafafa",
              },
            },
          }}
        />
        <div className="w-full">
          <Link href={"/"}>
            <Button
              className="mb-1 flex w-full items-center justify-start px-4 font-normal"
              size="lg"
              variant={favorites ? "ghost" : "secondary"}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span className="font-medium"> Team Supabase</span>
            </Button>
          </Link>

          <Link href={{ pathname: "/", query: { favorites: true } }}>
            <Button
              className="mb-1 flex w-full items-center justify-start px-4 font-normal"
              size="lg"
              variant={favorites ? "secondary" : "ghost"}
            >
              <Star className="mr-2 h-4 w-4" />
              <span className="font-medium"> Favorites</span>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrgSideBar;
