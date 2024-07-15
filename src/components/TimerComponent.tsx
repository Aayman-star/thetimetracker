"use client";
import React, { useState, useRef, useEffect } from "react";
import { timedown } from "@/lib/FunctionalLogic";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { StartButton, StopButton, ResetButton, DeleteButton } from "./Buttons";
import { useContext } from "react";
import { ClockContext } from "@/lib/context";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "./ui/button";
type TimerProp = {
  id: number;
  task: string;
  timerTime?: number;
};
type timeVariables = {
  hours: string;
  minutes: string;
  seconds: string;
};
const TimerComponent = ({ id, task, timerTime }: TimerProp) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<timeVariables>();
  const { stopTimer, resetTimer, deleteTaskFromTimer } =
    useContext(ClockContext);
  //?This is where we take time from user
  const [inputTime, setInputTime] = useState<number>(0);
  //? Time coming from the timer array or the default which is 5 minutes
  const [time, setTime] = useState<number>(timerTime ? timerTime : 300);

  //? This is for editing the default time to take input from the user
  const [edit, setEdit] = useState(false);
  const [intervalId, setIntervalId] = useState(0);
  const [timerCheck, setTimerCheck] = useState(false);

  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (edit) {
      inputRef.current.focus();
    }
  }, [edit]);
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
  const stopTheTimer = (id: number, time: number) => {
    stopTimer(id, time);
    clearInterval(intervalId);
    setTimerCheck(false);
  };
  const resetTheTimer = (id: number) => {
    resetTimer(id);
    clearInterval(intervalId);
    setTimerCheck(false);
    setTime(300);
  };
  //? Delete Task from the array
  const deleteTask = (id: number) => {
    deleteTaskFromTimer(id);
  };
  const onSubmit: SubmitHandler<timeVariables> = (data) => {
    console.log(data);

    const totalTimeInSeconds =
      parseInt(data.hours) * 3600 +
      parseInt(data.minutes) * 60 +
      parseInt(data.seconds);
    setTime(totalTimeInSeconds);
    console.log("Time", time, "Total time in seconds", totalTimeInSeconds);
    setEdit(false);
  };
  return (
    <div>
      <Card className="my-4 ">
        <CardHeader>
          <CardTitle>
            <p key={id} className=" text-2xl my-2">
              {task}
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div onDoubleClick={() => setEdit(true)}>
            {edit ? (
              <form
                ref={inputRef}
                className="flex items-center gap-x-4"
                onSubmit={handleSubmit(onSubmit)}>
                <Input
                  defaultValue={""}
                  {...register("hours")}
                  className="w-1/3"
                  placeholder="hh"
                />
                <span className="text-2xl font-medium">:</span>
                <Input
                  defaultValue={""}
                  {...register("minutes")}
                  className="w-1/3"
                  placeholder="mm"
                />
                <span className="text-2xl font-medium">:</span>
                <Input
                  defaultValue={""}
                  {...register("seconds")}
                  className="w-1/3"
                  placeholder="ss"
                />
                <Button
                  size="sm"
                  variant="secondary"
                  type="submit"
                  className="hidden">
                  Add Time
                </Button>
                {/* <Input type="submit" /> */}
              </form>
            ) : (
              <p className={`text-6xl text-primary font-bold`}>
                {/* Raw manipulation of the time variable */}
                {Math.abs(Math.floor(time / 3600)) < 10
                  ? `0${Math.abs(Math.floor(time / 3600))}`
                  : Math.abs(Math.floor(time / 3600))}
                :
                {Math.abs(Math.floor((time % 3600) / 60)) < 10
                  ? `0${Math.abs(Math.floor((time % 3600) / 60))}`
                  : Math.abs(Math.floor((time % 3600) / 60))}
                :
                {Math.abs(time % 60) < 10
                  ? `0${Math.abs(time % 60)}`
                  : Math.abs(time % 60)}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex items-center gap-x-4">
          {timerCheck ? (
            <StopButton
              onbtnClick={() => stopTheTimer(id, time)}
              className="bg-foreground hover:bg-muted-foreground"
            />
          ) : (
            <StartButton
              onbtnClick={countdown}
              className="bg-foreground hover:bg-muted-foreground"
            />
          )}

          <ResetButton
            onbtnClick={() => resetTheTimer(id)}
            className="bg-foreground hover:bg-muted-foreground"
          />
          <DeleteButton
            onbtnClick={() => deleteTask(id)}
            className="bg-foreground hover:bg-muted-foreground"
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default TimerComponent;
