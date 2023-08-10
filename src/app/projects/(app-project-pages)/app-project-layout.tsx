"use client";

import { ReactNode } from "react";

type AppProjectLayoutProps = {
  children: ReactNode;
};

const AppProjectLayout = ({ children }: AppProjectLayoutProps) => (
  <div className="md:max-w-xl lg:max-w-3xl xl:max-w-5xl relative flex flex-col items-center gap-y-20 mx-10 md:mx-auto mt-10">
    {children}
  </div>
);

export default AppProjectLayout;
