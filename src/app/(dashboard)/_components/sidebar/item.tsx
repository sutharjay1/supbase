"use client";

import Hint from "@/components/hint";
import { cn } from "@/lib/utils";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

const Item = ({ id, name, imageUrl }: ItemProps) => {
  const { organization } = useOrganization();

  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) return;
    setActive({ organization: id });
  };

  return (
    <div className="relative aspect-square">
      <Hint label={name}>
        <Image
          src={imageUrl}
          alt={name}
          width={40}
          height={40}
          onClick={onClick}
          className={cn(
            "cursor-pointer rounded-md opacity-75 transition duration-75 ease-in-out hover:opacity-100",
            isActive
              ? "border-[1.8px] border-green-500/75 opacity-100"
              : "opacity-85",
          )}
        />
      </Hint>
    </div>
  );
};

export default Item;
