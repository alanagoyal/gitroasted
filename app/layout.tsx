import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UnifrakturCook } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const unifrakturCook = UnifrakturCook({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-unifraktur",
});

export const metadata: Metadata = {
  title: "GitRoasted",
  description: "GitRoasted: Roast your GitHub profile with AI",
  openGraph: {
    title: "GitRoasted",
    description: "GitRoasted: Roast your GitHub profile with AI",
    images: ["/api/og"],
    siteName: "GitRoasted",
    url: process.env.NEXT_PUBLIC_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${unifrakturCook.variable}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
