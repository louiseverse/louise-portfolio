import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JarvisAssistant from "@/components/JarvisAssistant";
import ScrollControls from "@/components/ScrollControls";
import CursorAnimation from "@/components/CursorAnimation";
import LoadingScreen from "@/components/LoadingScreen";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Louise",
  description: "Louise Soledad portfolio",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <LoadingScreen />
        <Navbar />
        {children}
        <ScrollControls />
        <JarvisAssistant />
        <CursorAnimation />
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
