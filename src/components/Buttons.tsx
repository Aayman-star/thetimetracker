import { Button } from "./ui/button";
import { MdDelete } from "react-icons/md";
import { LuTimerReset } from "react-icons/lu";
import { FaStop, FaPlay } from "react-icons/fa";
import { SunIcon } from "@radix-ui/react-icons";
import { MoonIcon } from "@radix-ui/react-icons";
//For theme buttons
type themeProp = {
  onClick: () => void;
};
export const StartButton = () => {
  return (
    <Button size="icon" className="">
      <FaPlay />
    </Button>
  );
};

export const StopButton = () => {
  return (
    <Button size="icon" className="">
      <FaStop />
    </Button>
  );
};

export const ResetButton = () => {
  return (
    <Button size="icon" className="">
      <LuTimerReset />
    </Button>
  );
};
export const DeleteButton = () => {
  return (
    <Button size="icon" className="">
      <MdDelete />
    </Button>
  );
};

export const LightMode = ({ onClick }: themeProp) => {
  return (
    <Button onClick={onClick} size="icon" variant="outline">
      <SunIcon className="text-foreground" />
    </Button>
  );
};

export const DarkMode = ({ onClick }: themeProp) => {
  return (
    <Button onClick={onClick} size="icon" variant="outline">
      <MoonIcon className="text-foreground" />
    </Button>
  );
};
// ? This is how I styled the button before
//  <button className="bg-muted-foreground/50 rounded-lg text-background p-2">

//  </button>
