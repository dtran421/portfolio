import Image from "next/image";
import { ReactNode } from "react";
import { FiInfo, FiPercent } from "react-icons/fi";

type ScrollContainerProps = {
    children: ReactNode;
};

const ScrollContainer = ({ children }: ScrollContainerProps) => (
    <div className="w-full snap-center flex-special">
        <div className="w-full flex flex-col items-center px-4 lg:px-0 pb-4 mx-auto">
            {children}
        </div>
    </div>
);

type FlagListItemProps = {
    flag: string;
    description: string;
    infoTip?: string;
};

const FlagListItem = ({ flag, description, infoTip }: FlagListItemProps) => (
    <li>
        <div className="flex flex-col space-y-1">
            <p>
                <span className="font-medium px-1">{flag}</span>: {description}
            </p>
            {infoTip && (
                <div className="flex items-center bg-zinc-200/75 dark:bg-zinc-800/75 text-zinc-700 dark:text-zinc-300 dark-transition rounded-xl gap-x-3 px-4 py-2 ml-5">
                    <div>
                        <FiInfo size={22} />
                    </div>
                    <p className="text-sm">{infoTip}</p>
                </div>
            )}
        </div>
    </li>
);

type CodeFlagProps = {
    flag: string;
    text: string;
};

const CodeFlag = ({ flag, text }: CodeFlagProps) => (
    <span className="text-zinc-300/75">
        [-{flag} <span className="italic">{text}</span>]
    </span>
);

type MazeDemoProps = {
    img: string;
    code: string;
};

const MazeDemo = ({ img, code }: MazeDemoProps) => (
    <div className="flex flex-col justify-between items-center space-y-2 p-3">
        <div className="w-min rounded-xl overflow-hidden">
            <Image
                alt={`${img} video`}
                src={`/img/projects/maze/${img}.gif`}
                width={299}
                height={297}
                layout="fixed"
            />
        </div>
        <div className="flex text-lg bg-slate-800 dark:bg-gray-800/75 dark-transition rounded-lg space-x-2 p-3">
            <div className="flex items-center">
                <FiPercent size={22} className="text-primary font-medium" />
            </div>
            <p className="text-white">{code}</p>
        </div>
    </div>
);

const JavaSection = () => (
    <div className="w-full snap-x snap-mandatory scroll-smooth flex flex-nowrap overflow-x-scroll">
        <ScrollContainer>
            <h2 className="w-full text-3xl text-left font-semibold mb-6">
                Intro
            </h2>
            <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-24">
                <p className="w-full lg:w-1/2 text-xl text-left leading-relaxed">
                    In order to run the desktop version, you must have the Java
                    Development Kit (JDK) Version 1.8 installed on your device.
                    Below is the command to run the program after compiling it.
                    Notice, there are 4 optional parameters which can be
                    provided in any combination.
                </p>
                <div className="w-full lg:w-1/2 text-lg md:px-10 lg:px-0">
                    <ul className="list-disc list-outside space-y-2">
                        <FlagListItem
                            flag="f"
                            description="load in a maze from a predefined file"
                        />
                        <FlagListItem
                            flag="g"
                            description="maze generation algorithm"
                            infoTip="Choose from: Prim, Eller, or none (defaults to a randomized DFS algorithm)"
                        />
                        <FlagListItem
                            flag="d"
                            description="robot driver (for automated play)"
                            infoTip="Choose from: Wizard, WallFollower, Manual, or none (defaults to Manual)"
                        />
                        <FlagListItem
                            flag="r"
                            description="reliability of sensors (unreliable sensors will prevent automated 
                                        drivers from sensing in the given directions)"
                            infoTip="Sensor directions: Forward (f), Left (l), Right (r), Backward (b). Enter 1 for reliable and 0 for unreliable"
                        />
                    </ul>
                </div>
            </div>
            <div className="flex text-lg bg-slate-800 dark:bg-gray-800/75 dark-transition rounded-lg space-x-4 p-3 mt-10">
                <div className="flex items-center">
                    <FiPercent size={22} className="text-primary font-medium" />
                </div>
                <p className="text-white space-x-2">
                    <span>java</span>
                    <span>gui.MazeByDukeTran</span>
                    <CodeFlag flag="f" text="file" />
                    <CodeFlag flag="g" text="algorithm" />
                    <CodeFlag flag="d" text="driver" />
                    <CodeFlag flag="r" text="flrb" />
                </p>
            </div>
        </ScrollContainer>
        <ScrollContainer>
            <div className="w-full lg:w-3/4">
                <h2 className="text-3xl text-left font-semibold mb-6">
                    Gameplay
                </h2>
                <p className="text-xl text-left leading-relaxed">
                    The maze gameplay revolves around you controlling a robot in
                    first-person to navigate through a maze. You have the option
                    to modify the gameplay by entering flags when running the
                    program through the command line. Before maze generation,
                    you need to select a difficulty level (ranging from 0-9,
                    then a-f) from the main menu. The user interface of the game
                    is designed to aid you through the provision of a compass
                    and a map (when facing a dead-end). The background colors
                    also fade to gold on the top half of the screen and green on
                    the bottom (the colors of my alma mater, William & Mary) as
                    you get closer to the exit.
                </p>
            </div>
            <MazeDemo img="maze1" code="java gui.MazeByDukeTran" />
        </ScrollContainer>
        <ScrollContainer>
            <div className="w-full lg:w-3/4">
                <h2 className="text-3xl text-left font-semibold mb-6">
                    Maze Generation
                </h2>
                <p className="text-xl text-left leading-relaxed">
                    As mentioned previously, the maze generation algorithms
                    implemented include Prim, Eller, or a randomized DFS
                    algorithm. For our project, the Prim and DFS algorithms were
                    implemented out of the box. We were tasked with implementing
                    the Eller algorithm. To learn more about these algorithms,
                    here is a good{" "}
                    <a
                        href="https://weblog.jamisbuck.org/2011/2/7/maze-generation-algorithm-recap"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                    >
                        resource
                    </a>
                    . For demonstration purposes, all 3 of the maze runs below
                    were done at skill level 4.
                </p>
            </div>
            <div className="w-full flex flex-col lg:flex-row flex-wrap justify-center lg:space-x-4 space-y-20 lg:space-y-0">
                <MazeDemo
                    img="maze2"
                    code="java gui.MazeByDukeTran -d Wizard"
                />
                <MazeDemo
                    img="maze3"
                    code="java gui.MazeByDukeTran -g Prim -d Wizard"
                />
                <MazeDemo
                    img="maze4"
                    code="java gui.MazeByDukeTran -g Eller -d Wizard"
                />
            </div>
        </ScrollContainer>
        <ScrollContainer>
            <div className="w-full lg:w-3/4">
                <h2 className="text-3xl text-left font-semibold mb-6">
                    Robot Driver
                </h2>
                <p className="text-xl text-left leading-relaxed">
                    You may have noticed on the previous slide that the commands
                    contained the <span className="italic">d</span> flag
                    followed by Wizard. This flag specifies the type of robot
                    that the game will use. The Manual robot allows you to
                    control it and play the game yourself. The Wizard contains
                    and internal representation of the maze and therefore knows
                    the direct path to the exit. The WallFollower is a basic
                    naive (brute-force) robot that follows the left wall until
                    it reaches the exit. You will notice the WallFollower below
                    solves the maze extremely slowly (even when the maze is on
                    difficulty level 0) since it needs to sense in all four
                    directions after each move to make a decision on where to go
                    next.
                </p>
            </div>
            <MazeDemo
                img="maze5"
                code="java gui.MazeByDukeTran -g Eller -d WallFollower"
            />
        </ScrollContainer>
        <ScrollContainer>
            <div className="w-full lg:w-3/4">
                <h2 className="text-3xl text-left font-semibold mb-6">
                    Sensor Reliability
                </h2>
                <p className="text-xl text-left leading-relaxed">
                    The <span className="italic">r</span> flag controls the
                    reliability of the robot&#39;s sensors. This setting only
                    affects the WallFollower, since the Wizard knows the path to
                    the exit and therefore does not need to make use of sensors,
                    and the Manual driver is controlled by you (and you
                    don&#39;t have access to the sensors nor do you need them
                    since you can see the maze and its walls). In the gameplay
                    below, you&#39;ll notice the robot twitching/fidgeting at
                    some points since the sensors in those directions are
                    unreliable (and therefore nonoperational at times), so
                    it&#39;ll need to use its other operational sensors to sense
                    in that direction.
                </p>
            </div>
            <MazeDemo
                img="maze6"
                code="java gui.MazeByDukeTran -g Prim -d WallFollower -r 1010"
            />
        </ScrollContainer>
    </div>
);

export default JavaSection;
