"use client";
import { IPinItem } from "@/app/types/pinItem";
import Input from "@/components/Input";
import pinsMock from "@/constants/pinsMock";
import dynamic from "next/dynamic";
import { useState } from "react";

const MasonryGrid = dynamic(() => import("@/components/MasonryGrid"), {
  ssr: false,
});

const SearchPage = () => {
  const [pins, setPins] = useState<IPinItem[]>(pinsMock);

  const filterPins = (searchText: string) => {
    if (searchText) {
      setPins(
        pinsMock.filter(
          (pin) =>
            pin.description.includes(searchText) ||
            pin.title.includes(searchText)
        )
      );
    } else {
      setPins(pinsMock);
    }
  };
  const handleOnInputChange = (value: string) => {
    filterPins(value);
  };
  const handleOnSearchSubmit = (searchText: string) => {
    filterPins(searchText);
  };
  return (
    <div className="flex flex-col h-full">
      <div className="my-4 mx-auto flex-shrink-0">
        <Input
          onInputChange={handleOnInputChange}
          onSearchSubmit={handleOnSearchSubmit}
        />
      </div>
      <div className="flex-1">
        <MasonryGrid pins={pins} />
      </div>
    </div>
  );
};

export default SearchPage;
