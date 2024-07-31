import { createContext } from "react";

// Props for the timer
export type Timer = {
  id: number;
  tasktext: string;
  starttime?: number;
  stoptime?: number;
  created_at?: Date;
};
// Props for the Stopwatch
export type Watch = {
  id: number;
  tasktext: string;
  starttime?: number;
  stoptime?: number;
  created_at?: Date;
};
export type inputContext = {
  inputText: string;
};

type TimeTrackingContextState = {
  timerArray: Timer[];
  stopWatchArray: Watch[];
  theme: string | undefined;
  setTheme: (theme: string) => void;
  addTask: (task: string) => void;
  addTaskTimer: (task: string) => void;
  addTaskWatch: (task: string) => void;
  startTimer: (id: number, time: number) => void;
  startWatch: (id: number) => void;
  stopWatch: (id: number, time: number) => void;
  resetWatch: (id: number) => void;
  resetTimer: (id: number, time?: number) => void;
  deleteTaskFromTimer: (id: number) => void;
  deleteTaskFromWatch: (id: number) => void;
};

export const ClockContext = createContext<TimeTrackingContextState>({
  timerArray: [],
  stopWatchArray: [],
  theme: "",
  setTheme: () => {},
  addTask: () => {},
  addTaskTimer: () => {},
  addTaskWatch: () => {},
  startTimer: () => {},
  startWatch: () => {},
  stopWatch: () => {},
  resetWatch: () => {},
  resetTimer: () => {},
  deleteTaskFromTimer: () => {},
  deleteTaskFromWatch: () => {},
});
