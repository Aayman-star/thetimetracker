"use client";
import { useState, useEffect } from "react";
import { Data } from "@/lib/Data";
import TimerComponent from "./TimerComponent";
import { useContext } from "react";
import { ClockContext } from "@/context/context";
import { useUser } from "@clerk/nextjs";
import { fetchTasks } from "@/lib/DataBaseFunctions";

const Timer = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const { timerArray } = useContext(ClockContext);

  console.log("Timer", timerArray);
  return (
    <div className="grid grid-col-1 lg:grid-cols-2 gap-4">
      {timerArray.map((item, i) => (
        <TimerComponent key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Timer;
const fetchTimerTasks = async (user_id: string) => {
  const res = await fetchTasks(user_id);
  return res;
};
