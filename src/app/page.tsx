import TheTimeTrackerApp from "@/components/TheTimeTrackerApp";
import Head from "next/head";
import { Metadata } from "next";

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
