export type Data = {
  id: number;
  task: string;
  timerTime?: number;
  stopWatchTime?: number;
};

export const testDataTimer = [
  {
    id: 1,
    task: "Prepare Dinner",
    timerTime: 600,
  },
  {
    id: 2,
    task: "Do workout",
  },
];
export const testDataStopWatch = [
  {
    id: 1,
    task: "Prepare Dinner",
  },

  {
    id: 2,
    task: "Do workout",
    watchTime: 900,
  },
];
