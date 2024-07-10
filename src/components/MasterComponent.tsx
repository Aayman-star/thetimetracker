import { monty } from "@/lib/fonts";
import { almendra } from "@/lib/fonts";
import Input from "@/components/Input";
import { IoIosTimer } from "react-icons/io";
import { IoMdStopwatch } from "react-icons/io";
import Timer from "./Timer";
import { StopWatch } from "./StopWatch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const MasterComponent = () => {
  return (
    <main className="w-full h-[95vh]   p-20 bg-foreground">
      <div className="flex flex-col items-center w-full">
        {" "}
        <h1
          className={`${almendra.className} text-primary-foreground font-bold italic text-[1.5rem]  md:text-5xl`}>
          The Time Tracker
          <span
            className={`${monty.className} block font-light text-[0.6rem] md:text-sm text-center `}>
            Track your tasks and time with ease!
          </span>
        </h1>
        {/* <TimeTracker /> */}
        {/* <TestTimer /> */}
        <div className="my-4 w-full">
          <Input />
        </div>
      </div>
    </main>
  );
};

export default MasterComponent;
