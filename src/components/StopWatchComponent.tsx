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
};
type timeProp = {
  hours: number;
  minutes: number;
  seconds: number;
};
const StopWatchComponent = ({ id, task, watchTime }: WatchProp) => {
  const { stopWatch, resetWatch, deleteTaskFromWatch } =
    useContext(ClockContext);
  const [time, setTime] = useState<timeProp>({
    hours: watchTime ? Math.abs(Math.floor(watchTime / 3600)) : 0,
    minutes: watchTime ? Math.abs(Math.floor((watchTime % 3600) / 60)) : 0,
    seconds: watchTime ? Math.abs(watchTime % 60) : 0,
  });
  const [intervalId, setIntervalId] = useState(0);
  const [watchCheck, setWatchCheck] = useState(false);
  const resetTheWatch = (id: number) => {
    resetWatch(id);
    clearInterval(intervalId);
    setWatchCheck(false);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
  };
  const startWatch = () => {
    setWatchCheck(true);
    // console.log("I am here");
    const interval: any = setInterval(() => {
      setTime(({ hours, minutes, seconds }) => {
        const { Hours, Minutes, Seconds } = timeUp(
          hours * 3600 + minutes * 60 + seconds
        );
        return { hours: Hours, minutes: Minutes, seconds: Seconds };
      });
    }, 1000);

    setIntervalId(interval);
  };
  const stopTheWatch = (
    id: number,
    time: { hours: number; minutes: number; seconds: number }
  ) => {
    stopWatch(id, time.hours * 3600 + time.minutes * 60 + time.seconds);
    clearInterval(intervalId);
    setWatchCheck(false);
  };
  const deletetask = (id: number) => {
    deleteTaskFromWatch(id);
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
        <p className={`text-6xl text-foreground font-bold`}>
          <span className={`${time.hours ? "visible" : "hidden"}`}>
            {time.hours < 10 ? `0${time.hours}` : time.hours}:
          </span>
          <span
            className={`${
              time.seconds === 0 && time.minutes === 0
                ? "opacity-20"
                : "opacity-100"
            }`}>
            {time.minutes < 10 ? `0${time.minutes}` : time.minutes}:
          </span>

          <span
            className={`${
              time.seconds === 0 && time.minutes === 0
                ? "opacity-20"
                : "opacity-100"
            }`}>
            {time.seconds < 10 ? `0${time.seconds}` : time.seconds}
          </span>
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
