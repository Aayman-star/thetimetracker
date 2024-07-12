import { Data } from "@/lib/Data";
import TimerComponent from "./TimerComponent";

type TextProp = {
  task: Data[];
};

const Timer = ({ task }: TextProp) => {
  return (
    <div className="grid grid-col-1 md:grid-cols-2 gap-4">
      {task.map((item, i) => (
        <TimerComponent key={item.id} task={item.text} id={item.id} />
      ))}
    </div>
  );
};

export default Timer;
