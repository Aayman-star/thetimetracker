import React from "react";
import { Data } from "@/lib/Data";
type TextProp = {
  task: Data[];
};

const Timer = ({ task }: TextProp) => {
  return (
    <div>
      {task.map((item, i) => (
        <p key={i} className="text-background  font-light my-2">
          {item.text}
        </p>
      ))}
    </div>
  );
};

export default Timer;
