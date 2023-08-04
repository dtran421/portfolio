import { FiInfo } from "react-icons/fi";

import ScrollContainer, { CodeBox, ContainerBody, MazeDemo } from "./ScrollContainer";

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
  <span className="inline-block text-zinc-300/75">
    [-{flag} <span className="italic">{text}</span>]
  </span>
);

const JavaSection = () => (
  <div className="w-full snap-x snap-mandatory scroll-smooth flex flex-nowrap overflow-x-scroll">
    <ScrollContainer>
      <ContainerBody heading="Introduction">
        <div className="space-y-10">
          <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-20">
            <p className="w-full lg:w-1/2 text-lg lg:text-xl text-left leading-relaxed">
              In order to run the desktop version, you must have the Java Development Kit (JDK) Version 1.8 installed on
              your device. Below is the command to run the program after compiling it. Notice, there are 4 optional
              parameters which can be provided in any combination.
            </p>
            <div className="w-full lg:w-1/2 lg:text-lg px-4 md:px-10 lg:px-0">
              <ul className="list-disc list-outside space-y-2">
                <FlagListItem flag="f" description="load in a maze from a predefined file" />
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
          <div className="flex justify-center">
            <CodeBox args={["gui.MazeByDukeTran"]}>
              <CodeFlag flag="f" text="file" />
              <CodeFlag flag="g" text="algorithm" />
              <CodeFlag flag="d" text="driver" />
              <CodeFlag flag="r" text="flrb" />
            </CodeBox>
          </div>
        </div>
      </ContainerBody>
    </ScrollContainer>
    <ScrollContainer>
      <ContainerBody heading="Gameplay">
        The maze gameplay revolves around you controlling a robot in first-person to navigate through a maze. You have
        the option to modify the gameplay by entering flags when running the program through the command line. Before
        maze generation, you need to select a difficulty level (ranging from 0-9, then a-f) from the main menu. The user
        interface of the game is designed to aid you through the provision of a compass and a map (when facing a
        dead-end). The background colors also fade to gold on the top half of the screen and green on the bottom (the
        colors of my alma mater, William & Mary) as you get closer to the exit.
      </ContainerBody>
      <MazeDemo type="Java" img="maze1" args={["gui.MazeByDukeTran"]} />
    </ScrollContainer>
    <ScrollContainer>
      <ContainerBody heading="Maze Generation">
        As mentioned previously, the maze generation algorithms implemented include Prim, Eller, or a randomized DFS
        algorithm. For our project, the Prim and DFS algorithms were implemented out of the box. We were tasked with
        implementing the Eller algorithm. To learn more about these algorithms, here is a good{" "}
        <a
          href="https://weblog.jamisbuck.org/2011/2/7/maze-generation-algorithm-recap"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          resource
        </a>
        . For demonstration purposes, all 3 of the maze runs below were done at skill level 4.
      </ContainerBody>
      <div className="w-full flex flex-col lg:flex-row flex-wrap justify-center lg:space-x-4 space-y-6 lg:space-y-0">
        <MazeDemo type="Java" img="maze2" args={["gui.MazeByDukeTran", "-g Prim", "-d Wizard"]} />
        <MazeDemo type="Java" img="maze3" args={["gui.MazeByDukeTran", "-g Eller", "-d Wizard"]} />
      </div>
    </ScrollContainer>
    <ScrollContainer>
      <ContainerBody heading="Robot Driver">
        You may have noticed on the previous slide that the commands contained the <span className="italic">d</span>{" "}
        flag followed by Wizard. This flag specifies the type of robot that the game will use. The Manual robot allows
        you to control it and play the game yourself. The Wizard contains and internal representation of the maze and
        therefore knows the direct path to the exit. The WallFollower is a basic naive (brute-force) robot that follows
        the left wall until it reaches the exit. You will notice the WallFollower below solves the maze extremely slowly
        (even when the maze is on difficulty level 0) since it needs to sense in all four directions after each move to
        make a decision on where to go next.
      </ContainerBody>
      <MazeDemo type="Java" img="maze4" args={["gui.MazeByDukeTran", "-g Eller", "-d WallFollower"]} />
    </ScrollContainer>
    <ScrollContainer>
      <ContainerBody heading="Sensor Reliability">
        The <span className="italic">r</span> flag controls the reliability of the robot&#39;s sensors. This setting
        only affects the WallFollower, since the Wizard knows the path to the exit and therefore does not need to make
        use of sensors, and the Manual driver is controlled by you (and you don&#39;t have access to the sensors nor do
        you need them since you can see the maze and its walls). In the gameplay below, you&#39;ll notice the robot
        twitching/fidgeting at some points since the sensors in those directions are unreliable (and therefore
        nonoperational at times), so it&#39;ll need to use its other operational sensors to sense in that direction.
      </ContainerBody>
      <MazeDemo type="Java" img="maze5" args={["gui.MazeByDukeTran", "-g Prim", "-d WallFollower", "-r 1010"]} />
    </ScrollContainer>
  </div>
);

export default JavaSection;
