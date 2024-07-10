"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TestTimer = () => {
  const [inputTime, setInputTime] = useState("00:00");
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState(0);
  //  this code block is for handling the subitted data
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputTime("");
    const mins = Number.isNaN(parseInt(inputTime.split(":")[0]))
      ? 0
      : parseInt(inputTime.split(":")[0]);
    const sec = Number.isNaN(parseInt(inputTime.split(":")[1]))
      ? 0
      : parseInt(inputTime.split(":")[1]);
    const totalTimeInMS = (mins * 60 + sec) * 1000;
    const totalTimeInS = mins * 60 + sec;
    setTime(totalTimeInS);
    // setMinutes(parseInt(inputTime.split(":")[0]));
    setMinutes(Math.floor(time / 60));
    // setSeconds(parseInt(inputTime.split(":")[1]));
    setSeconds(sec);
    // console.log(inputTime.split(":")[0], inputTime.split(":")[1]);
    // console.log(
    //   parseInt(inputTime.split(":")[0]),
    //   parseInt(inputTime.split(":")[1])
    // );

    console.log("AT POINT ZERO");
    console.log(minutes, seconds);

    console.log("Total Time =", totalTimeInMS);
    console.log("Total Time in seconds =", totalTimeInS);
    setTime(totalTimeInS);
    console.log("Total Time = ", time);
  };

  const countdown = () => {
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
  const countUp = () => {
    console.log("I am here");
    const interval: any = setInterval(() => {
      setTime((prevTime) => {
        const newTime = timeUp(prevTime);
        return newTime;
      });
    }, 1000);

    setIntervalId(interval);
  };
  const stop = () => {
    clearInterval(intervalId);
  };
  return (
    <div>
      <form action="post" onSubmit={handleSubmit}>
        <div className="relative">
          <input
            className="bg-zinc-800 h-10 rounded-lg text-zinc-300 placeholder-opacity-50 placeholder-zinc-500"
            type="text"
            value={inputTime}
            onChange={(e) => setInputTime(e.target.value)}
            placeholder={"00m:00s"}
          />
          <button
            type="submit"
            className="text-zinc-300 w-8 h-8 bg-zinc-700 rounded-full px-1 py-1 absolute right-12 top-1">
            ⏲
          </button>
        </div>
      </form>

      <div className="flex items-center gap-x-4 mt-8">
        <p className="text-2xl text-zinc-300 font-mono ">
          {/* {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds} */}
          {Math.abs(Math.floor(time / 60)) < 10
            ? `0${Math.abs(Math.floor(time / 60))}`
            : Math.abs(Math.floor(time / 60))}
          :
          {Math.abs(time % 60) < 10
            ? `0${Math.abs(time % 60)}`
            : Math.abs(time % 60)}
        </p>
        <button
          onClick={countdown}
          className="bg-zinc-700 text-zinc-300 p-2 rounded-lg shadow-md shadow-zinc-500">
          Count ⬇
        </button>
        <button
          onClick={stop}
          className="bg-zinc-700 text-zinc-300 p-2 rounded-lg shadow-md shadow-zinc-500">
          stop
        </button>
        <button
          onClick={countUp}
          className="bg-zinc-700 text-zinc-300 p-2 rounded-lg shadow-md shadow-zinc-500">
          Count ⬆
        </button>
      </div>
    </div>
  );
};

export default TestTimer;
const timedown = (x: number): number => {
  //console.log(x);

  return x - 1;
};
const timeUp = (x: number): number => {
  //   console.log(x);
  return x + 1;
};
const notification = () => {
  return (
    <>
      <p className="text-2xl font-medium text-zinc-300">Time Up!</p>
    </>
  );
};
