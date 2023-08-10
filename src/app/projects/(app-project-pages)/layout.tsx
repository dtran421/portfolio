import { ReactNode } from "react";
import { Metadata } from "next";

import "@/styles/globals.css";

import AppProjectLayoutComponent from "./app-project-layout";

export const metadata: Metadata = {
  title: {
    template: "Projects | %s",
    default: "Duke Tran | Projects",
  },
};

const AppProjectLayout = ({ children }: { children: ReactNode }) => (
  <AppProjectLayoutComponent>{children}</AppProjectLayoutComponent>
);

export default AppProjectLayout;
