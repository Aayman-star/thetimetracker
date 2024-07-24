"use client";
import { useTheme } from "next-themes";
import { monty } from "@/lib/fonts";
import { almendra } from "@/lib/fonts";
import Main from "@/components/Main";

import { LightMode, DarkMode } from "./Buttons";
import ClockContextProvider from "@/context/ContextProvider";
const TheTimeTrackerApp = () => {
  const { theme, setTheme } = useTheme();
  return (
    <main className="w-full min-h-screen md:min-h-[95vh] p-8 md:p-14 bg-background">
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
            {theme === "light" ? (
              <DarkMode
                onbtnClick={() =>
                  setTheme(theme === "light" ? "dark" : "light")
                }
                Variant="ghost"
              />
            ) : (
              <LightMode
                onbtnClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                Variant="ghost"
              />
            )}
          </div>
        </div>

        <div className="my-4 w-full">
          <ClockContextProvider>
            <Main />
          </ClockContextProvider>
        </div>
      </div>
    </main>
  );
};

export default TheTimeTrackerApp;
