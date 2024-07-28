"use client";
import { ClockContext } from "./context";
import { Timer, Watch } from "./context";
import { useTheme } from "next-themes";
import { useUser } from "@clerk/nextjs";
import React, {
  ReactNode,
  useState,
  useEffect,
  useInsertionEffect,
} from "react";
import { testDataTimer, testDataStopWatch, Data } from "../lib/Data";
import { fetchTasks } from "@/lib/DataBaseFunctions";
type ContextProviderProps = {
  children: ReactNode;
};
type data = {
  id: number;
  user_id: string;
  tasktext: string;
  timertime: number;
  stopwatchtime: number;
  created_at: Date;
};
const ClockContextProvider = ({ children }: ContextProviderProps) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [Tasks, setTasks] = useState<any[]>([]);
  const [timerArray, setTimerArray] = useState<Timer[]>(
    user ? [] : testDataTimer
  );
  const [stopWatchArray, setStopWatchArray] = useState<Watch[]>(
    user ? [] : testDataStopWatch
  );
  //   const [userInput, setUserInput] = useState<string>("");
  const fetchTimerData = async (id: string) => {
    const data: Array<data> = await fetchTasks(id);
    if (data) {
      console.log("Timer Array:", data);
    } else {
      console.log("No Data");
    }
    const tempTimerData = data?.filter((item, i) => item?.timertime);
    const tempStopWatchData = data?.filter((item, i) => item?.stopwatchtime);
    setTimerArray(tempTimerData);
    setStopWatchArray(tempStopWatchData);
  };
  useEffect(() => {
    if (isSignedIn && user) {
      fetchTimerData(user?.id);
    }
  }, [isSignedIn, user]);

  //? Function to add task to the timer array
  const addTaskTimer = (task: string) => {
    const newTask = {
      id: timerArray.length + 1,
      tasktext: task,
    };
    setTimerArray([...timerArray, newTask]);
  };

  //? Function to add task to the stopwatch array
  const addTaskWatch = (task: string) => {
    const newTask = {
      id: stopWatchArray.length + 1,
      tasktext: task,
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
