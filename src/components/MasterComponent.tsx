"use client";
import { useTheme } from "next-themes";
import { monty } from "@/lib/fonts";
import { almendra } from "@/lib/fonts";
import Input from "@/components/Input";
import { IoIosTimer } from "react-icons/io";
import { IoMdStopwatch } from "react-icons/io";
import Timer from "./Timer";
import { StopWatch } from "./StopWatch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LightMode, DarkMode } from "./Buttons";
const MasterComponent = () => {
  const { theme, setTheme } = useTheme();
  return (
    <main className="w-full h-[95vh]   p-20 bg-background">
      <div className="flex flex-col items-center w-full">
        <div className="flex  gap-x-4">
          <h1
            className={`${almendra.className} text-foreground font-bold italic text-[1.5rem]  md:text-5xl`}>
            The Time Tracker
            <span
              className={`${monty.className} block font-light text-[0.6rem] md:text-sm text-center `}>
              Track your tasks and time with ease!
            </span>
          </h1>

          {theme === "dark" ? (
            <LightMode
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
          ) : (
            <DarkMode
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
          )}
        </div>

        <div className="my-4 w-full">
          <Input />
        </div>
      </div>
    </main>
  );
};

export default MasterComponent;
