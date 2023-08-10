import { ReactNode } from "react";

interface BackgroundMotivationProps {
  children: ReactNode;
}

const BackgroundMotivation = ({ children }: BackgroundMotivationProps) => (
  <div className="w-full lg:w-3/4 flex flex-col items-center space-y-6">
    <h1 className="text-4xl text-center font-bold">Background & Motivation</h1>
    <p className="text-xl text-center leading-relaxed">{children}</p>
  </div>
);

export default BackgroundMotivation;
