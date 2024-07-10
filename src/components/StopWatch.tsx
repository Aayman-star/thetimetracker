import React from "react";
import { StartButton, StopButton, ResetButton, DeleteButton } from "./Buttons";
import { Data } from "@/lib/Data";
type TextProp = {
  task: Data[];
};

export const StopWatch = ({ task }: TextProp) => {
  return (
    <div className="">
      <div>
        {task.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-y-4 md:gap-y-0 md:flex-row md:items-center justify-between my-2 py-2">
            <p key={index} className="text-background font-light">
              {item.text}
            </p>
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
          </div>
        ))}
      </div>
    </div>
  );
};
