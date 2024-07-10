type TimeObject = {
  hours: number | string;
  minutes: number | string;
  seconds: number | string;
};
export const calculateTimer = (
  timeinseconds: number
): Array<number | string> => {
  const hours = Math.floor(timeinseconds / 3600);
  const minutes = Math.floor(timeinseconds - hours * 3600) / 60;
  const seconds = timeinseconds - hours * 3600 + minutes * 60;
  const Hours = hours < 10 ? `0${hours}` : hours;
  const Minutes = minutes < 10 ? `0${minutes}` : minutes;
  const Seconds = seconds < 10 ? `0${seconds}` : seconds;
  return [Hours, Minutes, Seconds];
};
