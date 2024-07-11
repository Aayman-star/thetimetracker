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
type WatchProp = {
  id: number;
  task: string;
};
const StopWatchComponent = ({ id, task }: WatchProp) => {
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  const [watchCheck, setWatchCheck] = useState(false);
  const resetWatch = () => {
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
  const stopWatch = () => {
    clearInterval(intervalId);
    setWatchCheck(false);
  };
  return (
    <Card className="my-4 ">
      <CardHeader>
        <CardTitle>
          <p key={id} className="text-foreground  my-2">
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
          <StopButton onClick={stopWatch} />
        ) : (
          <StartButton onClick={startWatch} />
        )}

        <ResetButton onClick={resetWatch} />
        <DeleteButton />
      </CardFooter>
    </Card>
  );
};

export default StopWatchComponent;
