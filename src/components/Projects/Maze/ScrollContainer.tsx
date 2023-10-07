import { ReactNode } from "react";
import Image from "next/image";
import { FiPercent } from "react-icons/fi";

type ContainerBodyProps = {
  heading: string;
  children: ReactNode;
};

export const ContainerBody = ({ heading, children }: ContainerBodyProps) => (
  <div className="w-full space-y-3 px-4 lg:px-0">
    <h2 className="text-2xl lg:text-3xl text-left font-semibold">{heading}</h2>
    {heading === "Introduction" ? children : <p className="text-lg lg:text-xl text-left leading-relaxed">{children}</p>}
  </div>
);

type CodeBoxProps = {
  cliArgs: string[];
  children?: ReactNode;
};

export const CodeBox = ({ cliArgs, children }: CodeBoxProps) => (
  <p className="flex flex-wrap items-center text-lg text-white bg-slate-800 dark:bg-gray-800/75 dark-transition rounded-lg space-x-2 p-3">
    <FiPercent size={20} className="text-primary font-medium" />
    <span>java</span>
    {cliArgs.map((arg) => (
      <span key={arg} className="inline-block">
        {arg}
      </span>
    ))}
    {children}
  </p>
);

type MazeDemoProps = {
  type: "Java" | "Android";
  img: string;
  cliArgs?: string[];
};

export const MazeDemo = ({ type, img, cliArgs = [] }: MazeDemoProps) =>
  type === "Java" ? (
    <div className="h-full flex flex-col items-center space-y-2 p-3">
      <div className="h-full overflow-hidden rounded-xl">
        <Image
          alt={`${img} video`}
          src={`/img/projects/maze/${img}.gif`}
          width={299}
          height={297}
          layout="fixed"
          priority
        />
      </div>
      <CodeBox cliArgs={cliArgs} />
    </div>
  ) : (
    <div className="flex justify-center">
      <div className="h-full overflow-hidden rounded-xl p-3">
        <Image
          alt={`${img} android video`}
          src={`/img/projects/maze/${img}.gif`}
          width={208}
          height={430}
          layout="fixed"
          priority
        />
      </div>
    </div>
  );

type ScrollContainerProps = {
  children: ReactNode;
};

const ScrollContainer = ({ children }: ScrollContainerProps) => (
  <div className="w-full snap-center flex-special">
    <div className="w-full h-full flex flex-col items-center space-y-2 lg:px-16 pb-4">{children}</div>
  </div>
);

export default ScrollContainer;
