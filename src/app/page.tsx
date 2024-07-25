import { Metadata } from "next";
import TheTimeTrackerApp from "@/components/TheTimeTrackerApp";

export const metadata: Metadata = {
  title: "The Time Tracker",
};
export default function Home() {
  return (
    <>
      <TheTimeTrackerApp />
    </>
  );
}
