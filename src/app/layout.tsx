import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import { inter, monty } from "@/lib/fonts";

export const metadata: Metadata = {
  title: { default: "Time Tracker", template: "%s  |  Time Tracker" },
  description: "A app that helps you keep track of your time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${monty.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
