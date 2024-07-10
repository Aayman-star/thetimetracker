"use client";
import React, { useState, useEffect } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { FaStopCircle } from "react-icons/fa";
import { LuTimerReset } from "react-icons/lu";
import { calculateTimer } from "@/lib/Timer";
type TimeObject = {
  hours: number | string;
  minutes: number | string;
  seconds: number | string;
};
const TimeTracker = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeObject, setTimeObject] = useState<Array<number | string>>([]);
  const [timeinseconds, setTimeinseconds] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  useEffect(() => {
    let timeobject = calculateTimer(timeinseconds);
    setTimeObject(timeobject);
  }, [timeinseconds]);
  const StartWatch = () => {
    // const x: any = setInterval(() => {
    //   setSeconds((seconds) => seconds + 1);
    // }, 1000);
    // const y: any = setInterval(() => {
    //   setMinutes((minutes) => minutes + 1);
    //   setSeconds(0);
    // }, 60 * 1000);
    // const z: any = setInterval(() => {
    //   setHours((hours) => hours + 1);
    //   setMinutes(0);
    //   setSeconds(0);
    // }, 3600 * 1000);

    // setCurrent(x + Math.floor(y / 60000) + Math.floor(z / 3600000));
    let interval: any = setInterval(() => {
      setTimeinseconds((timeinseconds) => timeinseconds + 1);
    }, 1000);
    setIntervalId(interval);
    console.log(interval);
  };
  const StopWatch = () => {
    console.log("StopWatch");
    clearInterval(intervalId);
  };
  const resetWatch = () => {
    clearInterval(intervalId);
    setTimeinseconds(0);
    // setSeconds(0);
    // setMinutes(0);
    // setHours(0);
    // StopWatch();
  };
  return (
    <div>
      Let's implement a basic stop watch first!
      <div className="w-full flex flex-col items-center justify-around">
        {" "}
        <div
          className={` ${
            seconds === 0 && minutes === 0 && hours === 0
              ? "text-indigo-500/20"
              : "text-indigo-500"
          }  m-4 font-bold text-2xl border-b-[1px] border-neutral-500/50 w-full`}>
          {/* {hours < 10 ? "0" + hours : hours}:
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds} */}
          {timeObject[0]}:{timeObject[1]}:{timeObject[2]}
        </div>
        <div className="flex items center gap-4">
          <button onClick={StartWatch}>
            <FaPlayCircle className="w-7 h-7" />
          </button>
          <button onClick={StopWatch}>
            <FaStopCircle className="w-7 h-7" />
          </button>
          <button onClick={resetWatch}>
            <LuTimerReset className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeTracker;
