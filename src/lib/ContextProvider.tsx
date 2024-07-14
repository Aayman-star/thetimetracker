import React, { FC, ReactNode, useState } from "react";
import { ClockContext } from "./context";
import { Timer, Watch, inputContext } from "./context";
import { testDataTimer, testDataStopWatch } from "./Data";
type ContextProviderProps = {
  children: ReactNode;
};
const ClockContextProvider = ({ children }: ContextProviderProps) => {
  const [timerArray, setTimerArray] = useState<Timer[]>(testDataTimer);
  const [stopWatchArray, setStopWatchArray] =
    useState<Watch[]>(testDataStopWatch);
  //   const [userInput, setUserInput] = useState<string>("");

  const addTaskTimer = (task: string) => {
    const newTask = {
      id: timerArray.length + 1,
      task: task,
    };
    setTimerArray([...timerArray, newTask]);
  };
  const addTaskWatch = (task: string) => {
    const newTask = {
      id: stopWatchArray.length + 1,
      task: task,
    };
    setStopWatchArray([...stopWatchArray, newTask]);
  };

  const startTimer = () => {};
  const stopTimer = (id: number, time: number) => {
    setTimerArray(
      timerArray.map((item, i) =>
        item.id === id ? { ...item, timerTime: time } : item
      )
    );
  };
  const startWatch = () => {};
  const stopWatch = (id: number, time: number) => {
    setStopWatchArray(
      stopWatchArray.map((item, i) =>
        item.id === id ? { ...item, watchTime: time } : item
      )
    );
  };
  const resetWatch = (id: number) => {
    setStopWatchArray(
      stopWatchArray.map((item, i) =>
        item.id === id ? { ...item, watchTime: 0 } : item
      )
    );
  };
  const resetTimer = (id: number) => {
    setTimerArray(
      timerArray.map((item, i) =>
        item.id === id ? { ...item, timerTime: 0 } : item
      )
    );
  };
  return (
    <ClockContext.Provider
      value={{
        timerArray,
        stopWatchArray,
        // userInput,
        // setUserInput,
        addTaskTimer,
        addTaskWatch,
        startTimer,
        stopTimer,
        startWatch,
        stopWatch,
        resetWatch,
        resetTimer,
      }}>
      {children}
    </ClockContext.Provider>
  );
};

export default ClockContextProvider;
