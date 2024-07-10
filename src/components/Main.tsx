"use client";
import Timer from "./Timer";
import { Button } from "./ui/button";
import { StopWatch } from "./StopWatch";
import React, { useState } from "react";
import { IoIosTimer } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { IoMdStopwatch } from "react-icons/io";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { testData, Data } from "@/lib/Data";

const Main = () => {
  const [text, setText] = useState("");
  const [task, setTask] = useState<Data[]>(testData);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask: Data = { id: task.length + 1, text: text };
    setTask([...task, newTask]);
    setText("");
  };
  return (
    <>
      <div className="flex flex-col items-center gap-y-4">
        <form
          className="flex gap-x-2 w-full md:w-[50%] items-center "
          onSubmit={handleSubmit}
          action="post">
          <Input
            type="text"
            className="placeholder-zinc-500 placeholder-opacity-50 outline-none text-zinc-300"
            placeholder="Enter your task here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button type="submit" variant="secondary">
            +
          </Button>
        </form>
        {/* <p className="text-background">{task}</p> */}

        <div className="w-full">
          <Tabs defaultValue="Stopwatch" className="w-full md:w-[50%] mx-auto ">
            <TabsList className="grid w-full grid-cols-2 ">
              <TabsTrigger className={``} value="Stopwatch">
                Stopwatch
                <IoMdStopwatch />
              </TabsTrigger>
              <TabsTrigger value="Timer">
                Timer
                <IoIosTimer />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Stopwatch">
              {/* <p className="font-light text-primary">The StopWatch Component</p> */}
              <StopWatch task={task} />
            </TabsContent>
            <TabsContent value="Timer">
              {/* <p className="text-background font-light">The Timer Component</p> */}
              <Timer task={task} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Main;
