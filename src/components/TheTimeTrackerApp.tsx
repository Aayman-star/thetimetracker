"use client";
import { useTheme } from "next-themes";
import { monty } from "@/lib/fonts";
import { almendra } from "@/lib/fonts";
import Main from "@/components/Main";
import { IoIosTimer } from "react-icons/io";
import { IoMdStopwatch } from "react-icons/io";
import Timer from "./Timer";
import { StopWatch } from "./StopWatch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LightMode, DarkMode } from "./Buttons";
const TheTimeTrackerApp = () => {
  const { theme, setTheme } = useTheme();
  return (
    <main className="w-full min-h-screen p-10 md:p-20 bg-background">
      <div className="flex flex-col items-center w-full">
        <div className="flex">
          <h1
            className={`${almendra.className} text-foreground font-bold  text-[1.5rem]  md:text-5xl`}>
            The Time Tracker
            <span
              className={`${monty.className} block font-light text-[0.6rem] md:text-sm text-center `}>
              Track your tasks and time with ease!
            </span>
          </h1>
          <div className="md:mt-2">
            {theme === "dark" ? (
              <LightMode
                onbtnClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              />
            ) : (
              <DarkMode
                onbtnClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              />
            )}
          </div>
        </div>

        <div className="my-4 w-full">
          <Main />
        </div>
      </div>
    </main>
  );
};

export default TheTimeTrackerApp;
