"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const debouncedSetValue = useDebounceCallback((inputValue: string) => {
    setValue(inputValue);
  }, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSetValue(e.target.value);
  };

  useEffect(() => {
    if (value) {
      const url = qs.stringifyUrl(
        {
          url: "/",
          query: {
            search: value,
          },
        },
        { skipEmptyString: true, skipNull: true },
      );

      router.push(url);
    }
  }, [value, router]);

  return (
    <div className="relative flex w-full items-center gap-x-2">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search notes"
        className="w-full max-w-lg pl-9"
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
