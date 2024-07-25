import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { inter, monty } from "@/lib/fonts";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import ClockContextProvider from "@/context/ContextProvider";
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
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en" suppressHydrationWarning={true}>
        <body className={` ${monty.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <ClockContextProvider>
              <Header />
              {children}
              <Footer />
            </ClockContextProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
