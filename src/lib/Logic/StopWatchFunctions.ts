type task = {
  id: number;
  user_id: string;
  tasktext: string;
  starttime?: number;
  stoptime?: number;
  created_at: Date;
};

/**This function is to fetch data from the api at the backend */
export const fetchFromStopwatch = async (user_id: string) => {
  try {
    const response = await fetch(`/api/stopwatch?user_id=${user_id}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }
    /**Extracting the todos array from the received data */
    const { tasks } = await response.json();
    // console.log(`THIS IS THE RECEIVED DAT`, tasks);
    return tasks;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const sendToStopwatch = async (user_id: string, taskText: string) => {
  const response = await fetch("/api/stopwatch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: user_id, tasktext: taskText }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data.message);
  return data;
};

export const updateStartTimeInStopwatch = async (
  id: number,
  user_id: string,
  starttime?: number
) => {
  const response = await fetch("/api/stopwatch", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      user_id: user_id,
      starttime: starttime,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data.message);
  return data;
};
export const updateStopTimeInStopwatch = async (
  id: number,
  user_id: string,
  stoptime?: number
) => {
  const response = await fetch("/api/stopwatch", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      user_id: user_id,
      stoptime: stoptime,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data);
  console.log(data.message);
  return data;
};
export const deleteTaskFromStopwatchTable = async (
  id: number,
  user_id: string
) => {
  console.log("IN THE DATA FILE", id);
  try {
    const response = await fetch(`/api/stopwatch?id=${id}&user_id=${user_id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.Message === "Data deleted successfully") {
      console.log("Task deleted successfully");
    } else {
      console.error(data.Message);
    }
  } catch (error) {
    console.error(error);
  }
};
