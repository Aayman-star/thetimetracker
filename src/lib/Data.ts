export type Data = {
  id: number;
  tasktext: string;
  timerTime?: number;
  stopWatchTime?: number;
  created_at?: Date;
};

export const testDataTimer = [
  {
    id: 1,
    tasktext: "Prepare Dinner",
    timerTime: 600,
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
    watchTime: 900,
  },
];
