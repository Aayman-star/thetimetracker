import { almendra } from "@/lib/fonts";
import { monty } from "@/lib/fonts";
import TimeTracker from "@/components/TimeTracker";

export default function Home() {
  return (
    <main className="flex w-full h-[95vh] flex-col items-center  p-24 bg-neutral-900 ">
      <h1
        className={`${almendra.className} font-bold italic text-[1.5rem]  md:text-5xl`}>
        The Time Tracker
        <span
          className={`${monty.className} block font-light text-[0.6rem] md:text-sm text-center`}>
          Track your tasks and time with ease!
        </span>
      </h1>
      <TimeTracker />
    </main>
  );
}
// bg - [url("/anchors-away.svg")];
