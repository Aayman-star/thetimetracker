"use client";
import React, { useState, useEffect } from "react";
import StopWatchComponent from "./StopWatchComponent";
import { Data } from "@/lib/Data";
import { useContext } from "react";
import { ClockContext } from "@/lib/context";
// type TextProp = {
//   task: Data[];
// };

export const StopWatch = () => {
  const { stopWatchArray } = useContext(ClockContext);
  // const [taskWatch, setTaskWatch] = useState<Data[]>(task);
  // useEffect(() => {
  //   setTaskWatch(task);
  // }, [task]);
  // console.log("StopWatch", taskWatch);
  // const deleteTask = (id: number) => {
  //   console.log("I am in the stopwatch parent");
  //   setTaskWatch(taskWatch.filter((item) => item.id !== id));
  //   // console.log("taskWatch", taskWatch);
  // };
  // const updateTime = (id: number, time: number) => {
  //   console.log("I am in the stopwatch parent update time");
  //   setTaskWatch(
  //     taskWatch.map((item) => {
  //       if (item.id === id) {
  //         return { ...item, stopWatchTime: time };
  //       }
  //       return item;
  //     })
  //   );
  // };
  console.log("Stopwach", stopWatchArray);
  return (
    <div className="grid grid-col-1 lg:grid-cols-2 gap-4">
      {stopWatchArray.map((item, i) => (
        <StopWatchComponent key={item.id} {...item} />
      ))}
    </div>
  );
};
