import { ReactNode } from "react";
import { Metadata } from "next";
import { Oxygen, Quicksand } from "next/font/google";

import "@/styles/globals.css";

import MainLayout from "./main-layout";
import { openGraph } from "./shared-metadata";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
});

const oxygen = Oxygen({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oxygen",
});

export const metadata: Metadata = {
  title: {
    template: "Duke Tran | %s",
    default: "Duke Tran",
  },
  openGraph,
};

const RootLayout = ({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: ReactNode;
}) => (
  <html lang="en" className={`${quicksand.variable} ${oxygen.variable}`}>
    <body>
      <MainLayout>{children}</MainLayout>
    </body>
  </html>
);

export default RootLayout;
