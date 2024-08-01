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
import {
  fetchFromTimer,
  sendToTimer,
  updateStartTimeInTimer,
  deleteTaskFromTimerTable,
} from "@/lib/Logic/TimerFunctions";
import {
  fetchFromStopwatch,
  sendToStopwatch,
  updateStopTimeInStopwatch,
  deleteTaskFromStopwatchTable,
} from "@/lib/Logic/StopWatchFunctions";
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
  const [timerArray, setTimerArray] = useState<Timer[]>([]);
  const [stopWatchArray, setStopWatchArray] = useState<Watch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  //   const [userInput, setUserInput] = useState<string>("");
  const fetchTimerData = async (id: string) => {
    const data: Array<data> = await fetchFromTimer(id);
    if (data) {
      console.log("Timer Array:", data);
    } else {
      console.log("No Data");
    }
    const tempTimerData = data?.length ? data : [];

    setTimerArray(tempTimerData);
  };
  const fetchStopwatchData = async (id: string) => {
    const dataOne: Array<data> = await fetchFromStopwatch(id);
    if (dataOne) {
      console.log("Stopwatch Array:", dataOne);
    } else {
      console.log("No Data");
    }

    const tempStopWatchData = dataOne?.length ? dataOne : [];

    setStopWatchArray(tempStopWatchData);
  };
  useEffect(() => {
    // if (!isSignedIn && !isLoaded && !user) {
    //   setTimerArray(testDataTimer);
    //   setStopWatchArray(testDataStopWatch);
    // }
    if (isSignedIn && isLoaded && user) {
      fetchTimerData(user?.id);
      fetchStopwatchData(user?.id);
    }
    setIsLoading(false);
  }, [isSignedIn, user]);

  //? Function to add task to the timer array
  const addTaskTimer = (task: string) => {
    const newTask = {
      id: timerArray.length + 1,
      tasktext: task,
    };
    setTimerArray([...timerArray, newTask]);
    if (isSignedIn && user) {
      sendToTimer(user?.id, task);
    }
  };

  //? Function to add task to the stopwatch array
  const addTaskWatch = (task: string) => {
    const newTask = {
      id: stopWatchArray.length + 1,
      tasktext: task,
    };
    setStopWatchArray([...stopWatchArray, newTask]);
    if (isSignedIn && user) {
      sendToStopwatch(user?.id, task);
    }
  };
  //? The addTask function adds the task to both timer and stopwatch Arrays at the same time, This is addTaskTimer
  //?and addTaskwatch combined into one
  const addTask = (task: string) => {
    const newTaskTimer = {
      id: timerArray.length + 1,
      tasktext: task,
    };
    const newTaskStopWatch = {
      id: stopWatchArray.length + 1,
      tasktext: task,
    };
    setTimerArray([...timerArray, newTaskTimer]);
    setStopWatchArray([...stopWatchArray, newTaskStopWatch]);
    if (isSignedIn && user) {
      sendToTimer(user?.id, task);
      sendToStopwatch(user?.id, task);
    }
  };

  //? Function to start the timer

  //? Function to stop the timer and store the time in the array
  const startTimer = (id: number, timertime: number) => {
    setTimerArray(
      timerArray.map((item, i) =>
        item.id === id ? { ...item, timertime: timertime } : item
      )
    );
    if (isSignedIn && user) {
      updateStartTimeInTimer(id, user?.id, timertime);
    }
  };

  //? Function to start the stopwatch
  const startWatch = () => {};
  // ? Function to stop the watch and store the time in the array
  const stopWatch = (id: number, stoptime: number) => {
    setStopWatchArray(
      stopWatchArray.map((item, i) =>
        item.id === id ? { ...item, stoptime: stoptime } : item
      )
    );
    if (isSignedIn && user) {
      updateStopTimeInStopwatch(id, user?.id, stoptime);
    }
  };
  //? Function to reset the watch
  const resetWatch = (id: number, stoptime = 0) => {
    setStopWatchArray(
      stopWatchArray.map((item, i) =>
        item.id === id ? { ...item, stoptime: 0 } : item
      )
    );
    if (isSignedIn && user) {
      updateStopTimeInStopwatch(id, user?.id, stoptime);
    }
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
    if (isSignedIn && user) {
      deleteTaskFromTimerTable(id, user?.id);
    }
  };
  //? Function to delete Task from Watch
  const deleteTaskFromWatch = (id: number) => {
    setStopWatchArray(stopWatchArray.filter((item) => item.id !== id));
    if (isSignedIn && user) {
      deleteTaskFromStopwatchTable(id, user?.id);
    }
  };
  return (
    <ClockContext.Provider
      value={{
        theme,
        timerArray,
        stopWatchArray,
        isLoading,
        setTheme,
        addTask,
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
