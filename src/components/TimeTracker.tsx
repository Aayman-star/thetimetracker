"use client";
import React, { useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { FaStopCircle } from "react-icons/fa";
import { FaStopwatch } from "react-icons/fa6";

const TimeTracker = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [current, setCurrent] = useState(0);
  const StartWatch = () => {
    const x: any = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    const y: any = setInterval(() => {
      setMinutes((minutes) => minutes + 1);
      setSeconds(0);
    }, 60000);
    const z: any = setInterval(() => {
      setHours((hours) => hours + 1);
    }, 3600000);

    setCurrent(x + Math.floor(y / 60000) + Math.floor(z / 3600000));
  };
  const StopWatch = () => {
    console.log("StopWatch");
    clearInterval(current);
  };
  const resetWatch = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    StopWatch();
  };
  return (
    <div>
      Let's implement a basic stop watch first!
      <div className="w-full flex items-center justify-around">
        {" "}
        <div
          className={` ${
            seconds === 0 && minutes === 0 && hours === 0
              ? "text-indigo-500/20"
              : "text-indigo-500"
          }  m-4 font-bold text-2xl`}>
          {hours < 10 ? `0${hours}` : hours}:
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <div className="flex items center gap-4">
          <button onClick={StartWatch}>
            <FaPlayCircle className="w-7 h-7" />
          </button>
          <button onClick={StopWatch}>
            <FaStopCircle className="w-7 h-7" />
          </button>
          <button onClick={resetWatch}>
            <FaStopwatch className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeTracker;

// const StopWatch = (input: number): number => {
//   const x = setInterval(() => {
//     input++;
//     console.log(input);
//     //StopWatch(input);
//   }, 1000);
//   return x;
// };
