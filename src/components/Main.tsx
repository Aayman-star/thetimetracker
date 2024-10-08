"use client";
import Timer from "./Timer";
import { Button } from "./ui/button";
import { StopWatch } from "./StopWatch";
import React, { useState } from "react";
import { IoIosTimer } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { IoMdStopwatch } from "react-icons/io";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Data } from "@/lib/Data";
import { useContext } from "react";
import { ClockContext } from "@/context/context";
import { useUser } from "@clerk/nextjs";
import { SignInButton, SignedOut } from "@clerk/nextjs";

const Main = () => {
  const { isSignedIn } = useUser();
  const { addTaskTimer, addTaskWatch, addTask } = useContext(ClockContext);
  const [text, setText] = useState("");
  const [task, setTask] = useState<Data[]>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!isSignedIn) {
      e.preventDefault();
      setText("");
      console.log("not signed in");
    } else {
      e.preventDefault();
      addTaskWatch(text);
      setText("");
    }

    // const newTask: Data = { id: task.length + 1, task: text };
    // setTask([...task, newTask]);
  };
  const addToTimer = () => {
    addTaskTimer(text);
    setText("");
  };
  const addToWatch = () => {
    addTaskWatch(text);
    setText("");
  };

  return (
    <>
      <div className="flex flex-col items-center gap-y-4">
        <form
          className="flex gap-x-2 w-full md:w-[50%] items-center "
          //onSubmit={handleSubmit}
          onSubmit={(e) => {
            if (!text.trim()) {
              e.preventDefault();
              alert("Please enter a task.");
            } else {
              handleSubmit(e);
            }
          }}
          action="post">
          <Input
            type="text"
            className="placeholder-foreground placeholder-opacity-50 outline-none text-foreground"
            placeholder={
              !isSignedIn
                ? `Sign In to get started with the time tracker...`
                : `Enter your task here...`
            }
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {/* <Button type="submit" variant="secondary">
            +
          </Button> */}
          <Button
            type="submit"
            variant="secondary"
            onClick={(e) => {
              if (!text.trim()) {
                e.preventDefault();
                alert("Please enter a task.");
              } else {
                if (!isSignedIn) {
                  e.preventDefault();
                  setText("");
                } else {
                  e.preventDefault();
                  addToWatch();
                }
              }
            }}>
            Stopwatch+
          </Button>
          <Button
            type="submit"
            variant="secondary"
            onClick={(e) => {
              if (!text.trim()) {
                e.preventDefault();
                alert("Please enter a task.");
              } else {
                if (!isSignedIn) {
                  e.preventDefault();
                  setText("");
                } else {
                  e.preventDefault();
                  addToTimer();
                }
              }
            }}>
            Timer+
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
              <StopWatch />
            </TabsContent>
            <TabsContent value="Timer">
              {/* <p className="text-background font-light">The Timer Component</p> */}
              <Timer />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Main;

export const SignInModal = () => {
  return (
    <div className="w-full h-screen grid place-content-center">
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
    </div>
  );
};
