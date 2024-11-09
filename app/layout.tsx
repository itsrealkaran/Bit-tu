import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

const font = Nunito({ subsets: ["latin"] });
import "./globals.css";
import "@radix-ui/themes/styles.css";

import { Nunito } from "next/font/google";
import { Toaster } from 'sonner'

import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";

export const viewport: Viewport = {
  themeColor: "#22C55E",
};

export const metadata: Metadata = {
  title: "edulingo",
  description: "learn stuff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={font.className}
      >
        <Toaster theme="light" richColors closeButton />
        <ExitModal />
          <HeartsModal />
          <PracticeModal />
        {children}
      </body>
    </html>
  );
}
