import React, { createContext } from "react";

// Props for the timer
export type Timer = {
  id: number;
  task: string;
  timerTime?: number;
};
// Props for the Stopwatch
export type Watch = {
  id: number;
  task: string;
  watchTime?: number;
};
export type inputContext = {
  inputText: string;
};

type TimeTrackingContextState = {
  timerArray: Timer[];
  stopWatchArray: Watch[];
  //   userInput: string;
  //   setUserInput: (task: string) => void;
  addTaskTimer: (task: string) => void;
  addTaskWatch: (task: string) => void;
  startTimer: (id: number) => void;
  stopTimer: (id: number, time: number) => void;
  startWatch: (id: number) => void;
  stopWatch: (id: number, time: number) => void;
  resetWatch: (id: number) => void;
  resetTimer: (id: number) => void;
  deleteTaskFromTimer: (id: number) => void;
  deleteTaskFromWatch: (id: number) => void;
  //   startTracking: (id: number) => void;
  //   storeTime: (id: number, time: number) => void;
  //   deleteTask: (id: number) => void;
  //   resetTimer: (id: number) => void;
};

export const ClockContext = createContext<TimeTrackingContextState>({
  timerArray: [],
  stopWatchArray: [],
  //   userInput: "",
  //   setUserInput: () => {},
  addTaskTimer: () => {},
  addTaskWatch: () => {},
  startTimer: () => {},
  stopTimer: () => {},
  startWatch: () => {},
  stopWatch: () => {},
  resetWatch: () => {},
  resetTimer: () => {},
  deleteTaskFromTimer: () => {},
  deleteTaskFromWatch: () => {},
  //   startTracking: () => {},
  //   startTracking: () => {},
  //   storeTime: () => {},
  //   deleteTask: () => {},
  //   resetTimer: () => {},
});
