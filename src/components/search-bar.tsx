import {cn} from "@/lib/cn";
import React from "react";

interface SearchBarProps {
  className?: string;
  value?: string;
  onChange: (value: string) => void;
}

const SearchBar = ({className, value, onChange}: SearchBarProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search Product . . . . . . . . ."
      className={cn(
        "outline-none bg-amber-100 rounded-md py-4 px-4 w-full text-gray-500",
        className,
      )}
    />
  );
};

export default SearchBar;
