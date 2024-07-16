export const timedown = (
  /**This function receives time in seconds which is one whole number,then it divides this number into hours,minutes and seconds
   * and returns them as an object.At the moment the logic is to return decreasing values until x which  is the total time in seconds
   * becomes zero or negative.Then the function returns zero for all values.Hence the function willcount turn zero.after
   * which the function consistently return zero values.
   */
  x: number
): { Hours: number; Minutes: number; Seconds: number } => {
  //console.log(x);
  x = x - 1;
  if (x > 0) {
    const Hours = Math.abs(Math.floor(x / 3600));
    const Minutes = Math.abs(Math.floor((x % 3600) / 60));
    const Seconds = Math.abs(x % 60);
    // console.log(Hours, Minutes, Seconds);
    return { Hours, Minutes, Seconds };
  } else {
    return { Hours: 0, Minutes: 0, Seconds: 0 };
  }
};
export const timeUp = (
  x: number
): { Hours: number; Minutes: number; Seconds: number } => {
  //   console.log(x);
  x = x + 1;
  const Hours = Math.abs(Math.floor(x / 3600));
  const Minutes = Math.abs(Math.floor((x % 3600) / 60));
  const Seconds = Math.abs(x % 60);
  console.log(Hours, Minutes, Seconds);
  return { Hours, Minutes, Seconds };
};
