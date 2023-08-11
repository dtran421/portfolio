import { ReactNode } from "react";
import { Metadata } from "next";

import "@/styles/globals.css";

import MainLayout from "./main-layout";

export const openGraph = {
  title: "Duke Tran | Portfolio",
  description: "Learn more about Duke Tran and his projects.",
};

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
  <html lang="en">
    <body>
      <MainLayout>{children}</MainLayout>
    </body>
  </html>
);

export default RootLayout;
