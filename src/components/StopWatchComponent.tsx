"use client";
import React, { useState } from "react";
import { timeUp } from "@/lib/FunctionalLogic";
import { StartButton, StopButton, ResetButton, DeleteButton } from "./Buttons";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useContext } from "react";
import { ClockContext } from "@/lib/context";
type WatchProp = {
  id: number;
  task: string;
  watchTime?: number;
  // deleteTask: (id: number) => void;
  // updateTime: (id: number, time: number) => void;
};
const StopWatchComponent = ({ id, task, watchTime }: WatchProp) => {
  const { stopWatch, resetWatch } = useContext(ClockContext);
  const [time, setTime] = useState(watchTime ? watchTime : 0);
  const [intervalId, setIntervalId] = useState(0);
  const [watchCheck, setWatchCheck] = useState(false);
  const resetTheWatch = (id: number) => {
    resetWatch(id);
    clearInterval(intervalId);
    setWatchCheck(false);
    setTime(0);
  };
  const startWatch = () => {
    setWatchCheck(true);
    console.log("I am here");
    const interval: any = setInterval(() => {
      setTime((prevTime) => {
        const newTime = timeUp(prevTime);
        return newTime;
      });
    }, 1000);

    setIntervalId(interval);
  };
  const stopTheWatch = (id: number, time: number) => {
    // updateTime(id, time);
    stopWatch(id, time);
    clearInterval(intervalId);
    setWatchCheck(false);
  };
  const deletetask = (id: number) => {
    // deleteTask(id);
  };

  return (
    <Card className="my-4 ">
      <CardHeader>
        <CardTitle>
          <p key={id} className="text-primary  my-2">
            {task}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p
          className={`text-6xl ${
            time === 0 ? "opacity-20" : "opacity-100"
          } font-bold`}>
          {" "}
          {Math.abs(Math.floor(time / 60)) < 10
            ? `0${Math.abs(Math.floor(time / 60))}`
            : Math.abs(Math.floor(time / 60))}
          :
          {Math.abs(time % 60) < 10
            ? `0${Math.abs(time % 60)}`
            : Math.abs(time % 60)}
        </p>
      </CardContent>
      <CardFooter className="flex items-center gap-x-4">
        {watchCheck ? (
          <StopButton onbtnClick={() => stopTheWatch(id, time)} />
        ) : (
          <StartButton onbtnClick={startWatch} />
        )}

        <ResetButton onbtnClick={() => resetTheWatch(id)} />
        <DeleteButton onbtnClick={() => deletetask(id)} />
      </CardFooter>
    </Card>
  );
};

export default StopWatchComponent;
