import { FaStop, FaPlay } from "react-icons/fa";
import { LuTimerReset } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { Button } from "./ui/button";

export const StartButton = () => {
  return (
    // <button className="bg-muted-foreground/50 rounded-lg text-background p-2">
    <Button size="icon" className="bg-accent-foreground">
      <FaPlay />
    </Button>
    // </button>
  );
};

export const StopButton = () => {
  return (
    <button className="bg-muted-foreground/50 text-background p-2">
      <FaStop />
    </button>
  );
};

export const ResetButton = () => {
  return (
    <button className="bg-muted-foreground/50 rounded-lg text-background p-2">
      <LuTimerReset />
    </button>
  );
};
export const DeleteButton = () => {
  return (
    <button className="bg-muted-foreground/50 rounded-lg text-background p-2">
      <MdDelete />
    </button>
  );
};
