import { Button } from "./ui/button";
import { MdDelete } from "react-icons/md";
import { LuTimerReset } from "react-icons/lu";
import { FaStop, FaPlay } from "react-icons/fa";
import { SunIcon } from "@radix-ui/react-icons";
import { MoonIcon } from "@radix-ui/react-icons";
//For theme buttons
type BtnProp = {
  onbtnClick: () => void;
};
export const StartButton = ({ onbtnClick }: BtnProp) => {
  return (
    <Button onClick={onbtnClick} size="icon" className="">
      <FaPlay />
    </Button>
  );
};

export const StopButton = ({ onbtnClick }: BtnProp) => {
  return (
    <Button onClick={onbtnClick} size="icon" className="">
      <FaStop />
    </Button>
  );
};

export const ResetButton = ({ onbtnClick }: BtnProp) => {
  return (
    <Button onClick={onbtnClick} size="icon" className="">
      <LuTimerReset className="text-xl" />
    </Button>
  );
};
export const DeleteButton = () => {
  return (
    <Button size="icon" className="">
      <MdDelete className="text-xl" />
    </Button>
  );
};

export const LightMode = ({ onbtnClick }: BtnProp) => {
  return (
    <Button onClick={onbtnClick} size="icon" variant="ghost">
      <SunIcon className="text-foreground" />
    </Button>
  );
};

export const DarkMode = ({ onbtnClick }: BtnProp) => {
  return (
    <Button onClick={onbtnClick} size="icon" variant="ghost">
      <MoonIcon className="text-foreground " />
    </Button>
  );
};
// ? This is how I styled the button before
//  <button className="bg-muted-foreground/50 rounded-lg text-background p-2">

//  </button>
