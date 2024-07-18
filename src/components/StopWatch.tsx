"use client";

import StopWatchComponent from "./StopWatchComponent";
import { useContext } from "react";
import { ClockContext } from "@/context/context";

export const StopWatch = () => {
  const { stopWatchArray } = useContext(ClockContext);
  console.log("Stopwach", stopWatchArray);
  return (
    <div className="grid grid-col-1 lg:grid-cols-2 gap-4">
      {stopWatchArray.map((item, i) => (
        <StopWatchComponent key={item.id} {...item} />
      ))}
    </div>
  );
};
