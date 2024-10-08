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
  CardDescription,
} from "./ui/card";
import { useContext } from "react";
import { ClockContext } from "@/context/context";
type WatchProp = {
  id: number;
  tasktext: string;
  starttime?: number;
  stoptime?: number;
  stopwatchtime?: number;
  created_at?: Date;
};
type timeProp = {
  //Time Variable
  hours: number;
  minutes: number;
  seconds: number;
};
const StopWatchComponent = ({
  id,
  tasktext,
  stopwatchtime,
  starttime,
  stoptime,
  created_at,
}: WatchProp) => {
  const { stopWatch, resetWatch, deleteTaskFromWatch } =
    useContext(ClockContext);
  const [time, setTime] = useState<timeProp>({
    hours: stoptime ? Math.abs(Math.floor(stoptime / 3600)) : 0,
    minutes: stoptime ? Math.abs(Math.floor((stoptime % 3600) / 60)) : 0,
    seconds: stoptime ? Math.abs(stoptime % 60) : 0,
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
          <p key={id} className="text-primary text-xl  my-2">
            {tasktext}
          </p>
        </CardTitle>
        <CardDescription>
          {/* {created_at?.toLocaleString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })} */}
        </CardDescription>
        <hr />
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
          <StopButton
            onbtnClick={() => stopTheWatch(id, time)}
            Variant="link"
            className="border-[1px] border-primary"
          />
        ) : (
          <StartButton
            onbtnClick={startWatch}
            Variant="link"
            className="border-[1px] border-primary"
          />
        )}

        <ResetButton
          onbtnClick={() => resetTheWatch(id)}
          Variant="link"
          className="border-[1px] border-primary"
        />
        <DeleteButton
          onbtnClick={() => deletetask(id)}
          Variant="link"
          className="border-[1px] border-primary"
        />
      </CardFooter>
    </Card>
  );
};

export default StopWatchComponent;
