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
import {
  StartButton,
  StopButton,
  ResetButton,
  DeleteButton,
  TimerUp,
} from "./Buttons";
import { useContext } from "react";
import { ClockContext } from "@/context/context";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "./ui/button";
import useSound from "use-sound";
//import bell from "/public/sounds/bell.mp3";
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
type timeProp = {
  hours: number;
  minutes: number;
  seconds: number;
};
const TimerComponent = ({ id, task, timerTime }: TimerProp) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<timeVariables>();
  const [play, { stop }] = useSound("/sounds/bell.mp3");
  //!These functions are coming from the context */

  const { startTimer, resetTimer, deleteTaskFromTimer } =
    useContext(ClockContext);

  //?Time object to display and handle time,hours,minutes and seconds

  const [time, setTime] = useState<timeProp>({
    hours: timerTime ? Math.abs(Math.floor(timerTime / 3600)) : 0,
    minutes: timerTime
      ? Math.abs(Math.floor((timerTime % 3600) / 60))
      : 300 / 60,
    seconds: timerTime ? Math.abs(timerTime % 60) : 0,
  });
  //? This variable will keep record of the time given as input by the user
  const [userTime, setUserTime] = useState<timeProp>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  //? This is for editing the default time to take input from the user
  const [edit, setEdit] = useState(false);
  //!This is to keep a eye on the setInterval function
  const [intervalId, setIntervalId] = useState(0);
  //! This is a flag to let us know that the timer is on
  const [timerCheck, setTimerCheck] = useState(false);
  //!This is for when we take input from the user
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (edit) {
      inputRef.current.focus();
    }
  }, [edit]);

  const onTimeOut = () => {
    play();
    // resetTimer(id);
  };
  const countdown = () => {
    const totalCountDownTime =
      time.hours * 3600 + time.minutes * 60 + time.seconds;
    const totalCountDownTimeInMS = totalCountDownTime * 1000;
    console.log(totalCountDownTime);
    setTimerCheck(true);
    startTimer(id, totalCountDownTime);
    setTimeout(() => {
      onTimeOut();
    }, totalCountDownTimeInMS);
    const interval: any = setInterval(() => {
      setTime(({ hours, minutes, seconds }) => {
        const { Hours, Minutes, Seconds } = timedown(
          hours * 3600 + minutes * 60 + seconds
        );
        return { hours: Hours, minutes: Minutes, seconds: Seconds };
      });
    }, 1000);
    // console.log("time", time);

    setIntervalId(interval);
  };
  const stopTheTimer = (
    id: number,
    time: { hours: number; minutes: number; seconds: number }
  ) => {
    // stopTimer(id, time.hours * 3600 + time.minutes * 60 + time.seconds);
    clearInterval(intervalId);
    setTimerCheck(false);
  };
  const resetTheTimer = (id: number) => {
    resetTimer(id);
    clearInterval(intervalId);
    setTimerCheck(false);
    setTime(userTime ? userTime : { ...time, minutes: 300 / 60 });
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
    console.log("Total time in seconds", totalTimeInSeconds);
    setTime({
      hours: parseInt(data.hours ? data.hours : "0"),
      minutes: parseInt(data.minutes ? data.minutes : "0"),
      seconds: parseInt(data.seconds ? data.seconds : "0"),
    });
    setUserTime({
      hours: parseInt(data.hours ? data.hours : "0"),
      minutes: parseInt(data.minutes ? data.minutes : "0"),
      seconds: parseInt(data.seconds ? data.seconds : "0"),
    });
    console.log("user time", userTime);
    console.log("Time", time, "Total time in seconds", totalTimeInSeconds);
    setEdit(false);
  };

  const onTimeUp = (
    id: number,
    time: { hours: number; minutes: number; seconds: number }
  ) => {
    stop();
    // resetTheTimer(id);
    stopTheTimer(id, time);
    console.log(userTime);
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
                <span className={`${time.hours ? "visible" : "hidden"}`}>
                  {time.hours < 10 ? `0${time.hours}` : time.hours}:
                </span>
                <span>
                  {time.minutes < 10 ? `0${time.minutes}` : time.minutes}
                </span>
                :
                <span>
                  {time.seconds < 10 ? `0${time.seconds}` : time.seconds}
                </span>
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex items-center gap-x-4">
          {timerCheck ? (
            <StopButton onbtnClick={() => stopTheTimer(id, time)} />
          ) : (
            <StartButton onbtnClick={countdown} />
          )}

          <ResetButton onbtnClick={() => resetTheTimer(id)} />
          <DeleteButton onbtnClick={() => deleteTask(id)} />
          <TimerUp onbtnClick={() => onTimeUp(id, time)} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default TimerComponent;
