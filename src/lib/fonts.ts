import { Inter } from "next/font/google";
import { Almendra } from "next/font/google";
import { Montserrat } from "next/font/google";

export const almendra = Almendra({
  weight: ["700"],
  subsets: ["latin"],
});
export const inter = Inter({ subsets: ["latin"] });
export const monty = Montserrat({ subsets: ["latin"] });
