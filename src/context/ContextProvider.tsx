"use client";
import { ClockContext } from "./context";
import { Timer, Watch } from "./context";
import { useTheme } from "next-themes";
import React, { ReactNode, useState } from "react";
import { testDataTimer, testDataStopWatch } from "../lib/Data";
type ContextProviderProps = {
  children: ReactNode;
};
const ClockContextProvider = ({ children }: ContextProviderProps) => {
  const { theme, setTheme } = useTheme();
  const [timerArray, setTimerArray] = useState<Timer[]>(testDataTimer);
  const [stopWatchArray, setStopWatchArray] =
    useState<Watch[]>(testDataStopWatch);
  //   const [userInput, setUserInput] = useState<string>("");

  //? Function to add task to the timer array
  const addTaskTimer = (task: string) => {
    const newTask = {
      id: timerArray.length + 1,
      task: task,
    };
    setTimerArray([...timerArray, newTask]);
  };

  //? Function to add task to the stopwatch array
  const addTaskWatch = (task: string) => {
    const newTask = {
      id: stopWatchArray.length + 1,
      task: task,
    };
    setStopWatchArray([...stopWatchArray, newTask]);
  };

  //? Function to start the timer

  //? Function to stop the timer and store the time in the array
  const startTimer = (id: number, time: number) => {
    setTimerArray(
      timerArray.map((item, i) =>
        item.id === id ? { ...item, timerTime: time } : item
      )
    );
  };

  //? Function to start the stopwatch
  const startWatch = () => {};
  // ? Function to stop the watch and store the time in the array
  const stopWatch = (id: number, time: number) => {
    setStopWatchArray(
      stopWatchArray.map((item, i) =>
        item.id === id ? { ...item, watchTime: time } : item
      )
    );
  };
  //? Function to reset the watch
  const resetWatch = (id: number) => {
    setStopWatchArray(
      stopWatchArray.map((item, i) =>
        item.id === id ? { ...item, watchTime: 0 } : item
      )
    );
  };

  //? Function to reset the timer
  const resetTimer = (id: number, time?: number) => {
    setTimerArray(
      timerArray.map((item, i) =>
        item.id === id ? { ...item, timerTime: time ? time : 0 } : item
      )
    );
  };

  //? Function to delete Task from Timer
  const deleteTaskFromTimer = (id: number) => {
    setTimerArray(timerArray.filter((item) => item.id !== id));
  };
  //? Function to delete Task from Watch
  const deleteTaskFromWatch = (id: number) => {
    setStopWatchArray(stopWatchArray.filter((item) => item.id !== id));
  };
  return (
    <ClockContext.Provider
      value={{
        theme,
        timerArray,
        stopWatchArray,
        setTheme,
        addTaskTimer,
        addTaskWatch,
        startTimer,
        startWatch,
        stopWatch,
        resetWatch,
        resetTimer,
        deleteTaskFromTimer,
        deleteTaskFromWatch,
      }}>
      {children}
    </ClockContext.Provider>
  );
};

export default ClockContextProvider;
