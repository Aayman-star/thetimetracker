"use client";

import StopWatchComponent from "./StopWatchComponent";
import { useContext } from "react";
import { ClockContext } from "@/context/context";

export const StopWatch = () => {
  const { stopWatchArray, isLoading } = useContext(ClockContext);
  console.log("Stopwach", stopWatchArray);
  return (
    <div>
      {isLoading ? (
        <p className="py-2 text-primary">Waiting for stopwatch tasks</p>
      ) : (
        <div className="grid grid-col-1 lg:grid-cols-2 gap-4">
          {stopWatchArray?.length > 0 ? (
            stopWatchArray.map((item, i) => (
              <StopWatchComponent key={item.id} {...item} />
            ))
          ) : (
            <p className={`text-center py-2`}>
              No tasks at the moment in the stopwatch
            </p>
          )}
        </div>
      )}
    </div>
  );
};
// <div className="grid grid-col-1 lg:grid-cols-2 gap-4">
//       {stopWatchArray?.length > 0 ? (
//         stopWatchArray.map((item, i) => (
//           <StopWatchComponent key={item.id} {...item} />
//         ))
//       ) : (
//         <p className={`text-center py-2`}>
//           No tasks at the moment in the stopwatch
//         </p>
//       )}
//     </div>
