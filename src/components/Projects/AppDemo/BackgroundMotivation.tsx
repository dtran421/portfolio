import { ReactNode } from "react";

interface BackgroundMotivationProps {
  children: ReactNode;
}

const BackgroundMotivation = ({ children }: BackgroundMotivationProps) => (
  <article className="w-full lg:w-3/4 flex flex-col items-center dark:text-white dark-transition space-y-6">
    <h1 className="text-4xl text-center font-bold">Background & Motivation</h1>
    <p className="text-xl text-center leading-relaxed">{children}</p>
  </article>
);

export default BackgroundMotivation;
