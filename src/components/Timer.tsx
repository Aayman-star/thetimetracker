"use client";
import { useState, useEffect } from "react";
import { Data } from "@/lib/Data";
import TimerComponent from "./TimerComponent";
import { useContext } from "react";
import { ClockContext } from "@/context/context";
import { useUser } from "@clerk/nextjs";

const Timer = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const { timerArray, isLoading, theme } = useContext(ClockContext);

  // console.log("Timer", timerArray);
  return (
    <div>
      {isLoading ? (
        <p className="py-2 text-primary">Waiting for Timer tasks</p>
      ) : (
        <div className="grid grid-col-1 lg:grid-cols-2 gap-4">
          {timerArray?.length > 0 ? (
            timerArray.map((item, i) => (
              <TimerComponent key={item.id} {...item} />
            ))
          ) : (
            <p
              className={`py-2 ${
                theme === "dark" ? "text-primary" : "text-foreground"
              }`}>
              No tasks at the moment in the Timer
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Timer;
//  <div className="grid grid-col-1 lg:grid-cols-2 gap-4">
//     {timerArray?.length ? (
//       timerArray.map((item, i) => <TimerComponent key={item.id} {...item} />)
//     ) : (
//       <p>No tasks at the moment in the Timer</p>
//     )}
//   </div>
