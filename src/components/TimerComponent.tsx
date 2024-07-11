"use client";
import React, { useState } from "react";
import { timedown } from "@/lib/FunctionalLogic";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { StartButton, StopButton, ResetButton, DeleteButton } from "./Buttons";
type TimerProp = {
  id: number;
  task: string;
};

const TimerComponent = ({ id, task }: TimerProp) => {
  //This is for taking user input
  const [inputTime, setInputTime] = useState("00:00");
  const [time, setTime] = useState<number>(300);
  const [intervalId, setIntervalId] = useState(0);
  const [timerCheck, setTimerCheck] = useState(false);
  const countdown = () => {
    setTimerCheck(true);
    console.log("I am here");

    console.log(time);
    const forTimeout = time * 1000;

    const timeId = setTimeout(() => {
      console.log("time Up!");
    }, forTimeout);
    const interval: any = setInterval(() => {
      setTime((prevTime) => {
        const newTime = timedown(prevTime);
        return newTime;
      });
    }, 1000);
    console.log("time", time);

    setIntervalId(interval);
  };
  const stopTimer = () => {
    clearInterval(intervalId);
    setTimerCheck(false);
  };
  const resetTimer = () => {
    clearInterval(intervalId);
    setTimerCheck(false);
    setTime(300);
  };
  return (
    <div>
      <Card className="my-4 ">
        <CardHeader>
          <CardTitle>
            <p key={id} className="text-foreground text-2xl my-2">
              {task}
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-6xl text-primary font-bold">
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
          {timerCheck ? (
            <StopButton onClick={stopTimer} />
          ) : (
            <StartButton onClick={countdown} />
          )}

          <ResetButton onClick={resetTimer} />
          <DeleteButton />
        </CardFooter>
      </Card>
    </div>
  );
};

export default TimerComponent;
