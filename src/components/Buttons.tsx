import { Button } from "./ui/button";
import { MdDelete } from "react-icons/md";
import { LuTimerReset } from "react-icons/lu";
import { FaStop, FaPlay } from "react-icons/fa";
import { SunIcon } from "@radix-ui/react-icons";
import { MoonIcon } from "@radix-ui/react-icons";
import React, { FC } from "react";
import { GiAlarmClock } from "react-icons/gi";
//For theme buttons
type BtnProp = {
  onbtnClick: () => void;
  className?: string;
};
export const StartButton: FC<BtnProp> = ({ onbtnClick, className }) => {
  return (
    <Button
      onClick={onbtnClick}
      size="icon"
      className={className && className}
      variant="secondary">
      <FaPlay />
    </Button>
  );
};

export const StopButton = ({ onbtnClick, className }: BtnProp) => {
  return (
    <Button
      onClick={onbtnClick}
      size="icon"
      className={className}
      variant="secondary">
      <FaStop />
    </Button>
  );
};

export const ResetButton = ({ onbtnClick, className }: BtnProp) => {
  return (
    <Button
      onClick={onbtnClick}
      size="icon"
      className={className}
      variant="secondary">
      <LuTimerReset className="text-xl" />
    </Button>
  );
};
export const DeleteButton = ({ onbtnClick, className }: BtnProp) => {
  return (
    <Button
      onClick={onbtnClick}
      size="icon"
      className={className}
      variant="secondary">
      <MdDelete className="text-xl" />
    </Button>
  );
};

export const LightMode = ({ onbtnClick, className }: BtnProp) => {
  return (
    <Button
      onClick={onbtnClick}
      size="icon"
      variant="ghost"
      className={className}>
      <SunIcon className="text-foreground" />
    </Button>
  );
};

export const DarkMode = ({ onbtnClick, className }: BtnProp) => {
  return (
    <Button
      onClick={onbtnClick}
      size="icon"
      variant="ghost"
      className={className}>
      <MoonIcon className="text-foreground " />
    </Button>
  );
};

export const TimerUp = ({ onbtnClick, className }: BtnProp) => {
  return (
    <Button
      onClick={onbtnClick}
      size="icon"
      className={className}
      variant="secondary">
      <GiAlarmClock className="text-xl rotate-90" />
    </Button>
  );
};

// ? This is how I styled the button before
//  <button className="bg-muted-foreground/50 rounded-lg text-background p-2">

//  </button>
