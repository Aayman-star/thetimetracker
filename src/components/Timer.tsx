"use client";
import { useState, useEffect } from "react";
import { Data } from "@/lib/Data";
import TimerComponent from "./TimerComponent";
import { useContext } from "react";
import { ClockContext } from "@/context/context";
import { useUser } from "@clerk/nextjs";

const Timer = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const { timerArray } = useContext(ClockContext);

  console.log("Timer", timerArray);
  return (
    <div className="grid grid-col-1 lg:grid-cols-2 gap-4">
      {timerArray?.length ? (
        timerArray.map((item, i) => <TimerComponent key={item.id} {...item} />)
      ) : (
        <p>No tasks at the moment</p>
      )}
    </div>
  );
};

export default Timer;
