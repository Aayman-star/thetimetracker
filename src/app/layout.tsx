import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";

import "./globals.css";
import { inter, monty } from "@/lib/fonts";
import { ClerkProvider } from "@clerk/nextjs";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: { default: "Time Tracker", template: "%s  |  Time Tracker" },
  description: "An app that helps you keep track of your time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${monty.className}`}>
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
