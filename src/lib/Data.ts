export type Data = {
  id: number;
  tasktext: string;
  starttime?: number;
  stoptime?: number;
  totaltime?: number;
  timertime?: number;
  stopWatchtime?: number;
  created_at?: Date;
};

export const testDataTimer = [
  {
    id: 1,
    tasktext: "Prepare Dinner",
    starttime: 600,
  },
  {
    id: 2,
    tasktext: "Do workout",
  },
];
export const testDataStopWatch = [
  {
    id: 1,
    tasktext: "Prepare Dinner",
  },

  {
    id: 2,
    tasktext: "Do workout",
    stoptime: 900,
  },
];
