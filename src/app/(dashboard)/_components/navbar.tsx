"use client";

import {
  OrganizationSwitcher,
  useOrganization,
  UserButton,
} from "@clerk/nextjs";
import React from "react";
import SearchInput from "./search-input";
import InviteButton from "./invite-button";

const NavBar = () => {
  const { organization } = useOrganization();

  console.log(organization);

  return (
    <div className="flex items-center gap-x-6 px-3 py-5 lg:p-5">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
      <div className="block flex-1 lg:hidden">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "376px",
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
      </div>
      {organization && <InviteButton />}
      <UserButton />
    </div>
  );
};

export default NavBar;
