"use client";
import React, { useState } from "react";
import StopWatchComponent from "./StopWatchComponent";
import { Data } from "@/lib/Data";
type TextProp = {
  task: Data[];
};

export const StopWatch = ({ task }: TextProp) => {
  return (
    <div className="grid grid-col-1 md:grid-cols-2 gap-4">
      {" "}
      {task.map((item, i) => (
        <StopWatchComponent key={item.id} task={item.text} id={item.id} />
      ))}
    </div>
  );
};

{
  /* <div>
        {task.map((item, index) => (
          <Card
            key={index}
            className="bg-zinc-900 my-2 border-muted-foreground shadow-md">
            <CardHeader>
              <CardTitle>
                <p key={index} className="text-background font-light text-lg">
                  {item.text}
                </p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-primary text-4xl font-semibold`}>
                {time}:{time}
              </p>
            </CardContent>
            <CardFooter>
              {" "}
              <div className="flex items-center gap-x-4">
                <div>
                  <StartButton />
                </div>
                <div>
                  <ResetButton />
                </div>
                <div>
                  <DeleteButton />
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div> */
}
