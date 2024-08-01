import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { inter, monty } from "@/lib/fonts";
import { ClerkProvider, ClerkLoading } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import ClockContextProvider from "@/context/ContextProvider";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export const metadata: Metadata = {
  metadataBase: new URL("https://thetimetracker.vercel.app/"),
  title: { default: "TheTimeTracker", template: "%s  |  Time Tracker" },
  description: "An app that helps you keep track of your time",

  openGraph: {
    title: "TheTimeTracker",
    description: "An app that helps you keep track of your time",
    url: "https://thetimetracker.vercel.app/",
    siteName: "TheTimeTracker",
    locale: "en_US",
    type: "website",
    images: "/opengraph-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "TheTimeTracker",
    description: "An app that helps you keep track of your time.",
  },
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
