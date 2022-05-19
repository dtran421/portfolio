import { ReactNode } from "react";
import Image from "next/image";
import { FiPercent } from "react-icons/fi";

type ContainerBodyProps = {
    heading: string;
    children: ReactNode;
};

export const ContainerBody = ({ heading, children }: ContainerBodyProps) => (
    <div className="w-full space-y-3 px-4 lg:px-0">
        <h2 className="text-2xl lg:text-3xl text-left font-semibold">
            {heading}
        </h2>
        {heading === "Introduction" ? (
            children
        ) : (
            <p className="text-lg lg:text-xl text-left leading-relaxed">
                {children}
            </p>
        )}
    </div>
);

type CodeBoxProps = {
    args: string[];
    children?: ReactNode;
};

export const CodeBox = ({ args, children }: CodeBoxProps) => (
    <p className="flex flex-wrap items-center text-lg text-white bg-slate-800 dark:bg-gray-800/75 dark-transition rounded-lg space-x-2 p-3">
        <FiPercent size={20} className="text-primary font-medium" />
        <span>java</span>
        {args.map((arg) => (
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
    args?: string[];
};

export const MazeDemo = ({ type, img, args = [] }: MazeDemoProps) =>
    type === "Java" ? (
        <div className="flex flex-col items-center space-y-2 p-3">
            <div className="w-min rounded-xl overflow-hidden">
                <Image
                    alt={`${img} video`}
                    src={`/img/projects/maze/${img}.gif`}
                    width={299}
                    height={297}
                    layout="fixed"
                />
            </div>
            <CodeBox {...{ args }} />
        </div>
    ) : (
        <div className="flex justify-center">
            <div className="w-min overflow-hidden rounded-xl p-3">
                <Image
                    alt={`${img} android video`}
                    src={`/img/projects/maze/${img}.gif`}
                    width={208}
                    height={430}
                    layout="fixed"
                />
            </div>
        </div>
    );

type ScrollContainerProps = {
    children: ReactNode;
};

const ScrollContainer = ({ children }: ScrollContainerProps) => (
    <div className="w-full snap-center flex-special">
        <div className="w-full flex flex-col items-center space-y-2 lg:px-16 pb-4">
            {children}
        </div>
    </div>
);

export default ScrollContainer;
