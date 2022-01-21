import { FC } from "react";
import Image from "next/image";
import { FiInfo, FiPercent } from "react-icons/fi";

import ProjectLayout from "../../components/Global/layouts/ProjectLayout";

const Maze: FC<{}> = () => {
   return (
      <ProjectLayout
         page="Maze Game"
         accent="bg-maze"
         darkText={false}
         github="https://github.com/dtran421/MazeByDukeTran">
         <div className="md:max-w-2xl lg:max-w-4xl xl:max-w-7xl h-screen flex mx-10 md:mx-auto">
            <div className="w-full flex flex-col items-center space-y-32">
               <div className="w-full lg:w-3/4 flex flex-col items-center space-y-6">
                  <h1 className="text-4xl text-center font-bold">Background & Motivation</h1>
                  <p className="text-xl text-center leading-relaxed">
                     {`This project was completed as a part of a semester-long project for my CSCI 301 Software Development course at William & Mary. The project is split into two parts, one implemented for desktop use and the other for an Android app. Both parts were coded in Java and thorougly documented through Github with periodic tags. Below, the two parts of the project are explained separately with details outlining the different aspects of the game.`}
                  </p>
               </div>
               {/* // TODO: add overflow-y-hidden */}
               <div className="w-full h-full snap-x snap-mandatory scroll-smooth flex flex-nowrap overflow-x-scroll">
                  <div className="w-full snap-center flex-special">
                     <div className="w-full h-full flex flex-col items-center px-10 pb-10 mx-auto">
                        <h2 className="w-full text-3xl text-left font-semibold mb-6">Intro</h2>
                        <div className="flex space-x-24">
                           <p className="w-1/2 text-xl text-left leading-relaxed">
                              {`In order to run the desktop version, you must have the Java Development Kit (JDK) Version 1.8 installed on your device. Below is the command to run the program after compiling it. Notice, there are 4 optional parameters which can be provided in any combination.`}
                           </p>
                           <div className="w-1/2 text-lg">
                              <ul className="list-disc list-outside space-y-2">
                                 <li>
                                    <span className="font-medium px-1">f</span>: load in a maze from a predefined file
                                 </li>
                                 <li>
                                    <div className="flex flex-col space-y-1">
                                       <p>
                                          <span className="font-medium px-1">g</span>: maze generation algorithm
                                       </p>
                                       <InfoTip
                                          text={
                                             "Choose from: Prim, Eller, or none (defaults to a randomized DFS algorithm)"
                                          }
                                       />
                                    </div>
                                 </li>
                                 <li>
                                    <div className="flex flex-col space-y-1">
                                       <p>
                                          <span className="font-medium px-1">d</span>: robot driver (for automated play)
                                       </p>
                                       <InfoTip
                                          text={
                                             "Choose from: Wizard, WallFollower, Manual, or none (defaults to Manual)"
                                          }
                                       />
                                    </div>
                                 </li>
                                 <li>
                                    <div className="flex flex-col space-y-1">
                                       <p>
                                          <span className="font-medium px-1">r</span>: reliability of sensors
                                          (unreliable sensors will prevent automated drivers from sensing in the given
                                          directions)
                                       </p>
                                       <InfoTip
                                          text={
                                             "Sensor directions: Forward (f), Left (l), Right (r), Backward (b). Enter 1 for reliable and 0 for unreliable"
                                          }
                                       />
                                    </div>
                                 </li>
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
                     </div>
                  </div>
                  <div className="w-full snap-center flex-special">
                     <div className="flex flex-col items-center space-y-10 px-10 pb-10 mx-auto">
                        <div className="w-3/4">
                           <h2 className="text-3xl text-left font-semibold mb-6">Gameplay</h2>
                           <p className="text-xl text-left leading-relaxed">
                              The maze gameplay revolves around you controlling a robot in first-person to navigate
                              through a maze. You have the option to modify the gameplay by entering flags when running
                              the program through the command line. Before maze generation, you need to select a
                              difficulty level (ranging from 0-9, then a-f) from the main menu. The user interface of
                              the game is designed to aid the player through the provision of a compass and a map (when
                              facing a dead-end). The background colors also fade to gold on the top half of the screen
                              and green on the bottom (the colors of my alma mater, William & Mary) as you get closer to
                              the exit.
                           </p>
                        </div>
                        <div className="flex flex-col items-center">
                           <div className="w-min rounded-xl overflow-hidden">
                              <Image
                                 alt="maze video 1"
                                 src="/img/maze/maze1.gif"
                                 width={299}
                                 height={297}
                                 layout="fixed"
                              />
                           </div>
                           <div className="flex text-lg bg-slate-800 dark:bg-gray-800/75 dark-transition rounded-lg space-x-2 p-3 mt-4">
                              <div className="flex items-center">
                                 <FiPercent size={22} className="text-primary font-medium" />
                              </div>
                              <p className="text-white">java gui.MazeByDukeTran</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="w-full snap-center flex-special">
                     <div className="flex flex-col items-center space-y-10 px-10 pb-10 mx-auto">
                        <div className="w-3/4">
                           <h2 className="text-3xl text-left font-semibold mb-6">Maze Generation</h2>
                           <p className="text-xl text-left leading-relaxed">
                              As mentioned previously, the maze generation algorithms implemented include Prim, Eller,
                              or a randomized DFS algorithm. For our project, the Prim and DFS algorithms were
                              implemented out of the box. We were tasked with implementing the Eller algorithm. To learn
                              more about these algorithms, here is a good{" "}
                              <a
                                 href="https://weblog.jamisbuck.org/2011/2/7/maze-generation-algorithm-recap"
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="font-medium underline underline-offset-2">
                                 resource
                              </a>
                              . For demonstration purposes, all 3 of the maze runs below were done at skill level 4.
                           </p>
                        </div>
                        <div className="w-full flex justify-center space-x-4">
                           <div className="flex flex-col items-center">
                              <div className="w-min rounded-xl overflow-hidden">
                                 <Image
                                    alt="maze video 2"
                                    src="/img/maze/maze2.gif"
                                    width={299}
                                    height={297}
                                    layout="fixed"
                                 />
                              </div>
                              <div className="flex text-lg bg-slate-800 dark:bg-gray-800/75 dark-transition rounded-lg space-x-2 p-3 mt-4">
                                 <div className="flex items-center">
                                    <FiPercent size={22} className="text-primary font-medium" />
                                 </div>
                                 <p className="text-white">java gui.MazeByDukeTran -d Wizard</p>
                              </div>
                           </div>
                           <div className="flex flex-col items-center">
                              <div className="w-min rounded-xl overflow-hidden">
                                 <Image
                                    alt="maze video 3"
                                    src="/img/maze/maze3.gif"
                                    width={299}
                                    height={297}
                                    layout="fixed"
                                 />
                              </div>
                              <div className="flex text-lg bg-slate-800 dark:bg-gray-800/75 dark-transition rounded-lg space-x-2 p-3 mt-4">
                                 <div className="flex items-center">
                                    <FiPercent size={22} className="text-primary font-medium" />
                                 </div>
                                 <p className="text-white">java gui.MazeByDukeTran -g Prim -d Wizard</p>
                              </div>
                           </div>
                           <div className="flex flex-col items-center">
                              <div className="w-min rounded-xl overflow-hidden">
                                 <Image
                                    alt="maze video 4"
                                    src="/img/maze/maze4.gif"
                                    width={299}
                                    height={297}
                                    layout="fixed"
                                 />
                              </div>
                              <div className="flex text-lg bg-slate-800 dark:bg-gray-800/75 dark-transition rounded-lg space-x-2 p-3 mt-4">
                                 <div className="flex items-center">
                                    <FiPercent size={22} className="text-primary font-medium" />
                                 </div>
                                 <p className="text-white">java gui.MazeByDukeTran -g Eller -d Wizard</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="w-full snap-center flex-special">
                     <div className="flex flex-col items-center space-y-10 px-10 pb-10 mx-auto">
                        <div className="w-3/4">
                           <h2 className="text-3xl text-left font-semibold mb-6">Robot Driver</h2>
                           <p className="text-xl text-left leading-relaxed">
                              You may have noticed on the previous slide that the commands contained the{" "}
                              <span className="italic">d</span> flag followed by Wizard. This flag specifies the type of
                              robot that the game will use. The Manual robot allows you to control it and play the game
                              yourself. The Wizard contains and internal representation of the maze and therefore knows
                              the direct path to the exit. The WallFollower is a basic naive (brute-force) robot that
                              follows the left wall until it reaches the exit. You will notice the WallFollower below
                              solves the maze extremely slowly (even when the maze is on difficulty level 0) since it
                              needs to sense in all four directions after each move to make a decision on where to go
                              next.
                           </p>
                        </div>
                        <div className="w-full flex justify-center space-x-4">
                           <div className="flex flex-col items-center">
                              <div className="w-min rounded-xl overflow-hidden">
                                 <Image
                                    alt="maze video 5"
                                    src="/img/maze/maze5.gif"
                                    width={299}
                                    height={297}
                                    layout="fixed"
                                 />
                              </div>
                              <div className="flex text-lg bg-slate-800 dark:bg-gray-800/75 dark-transition rounded-lg space-x-2 p-3 mt-4">
                                 <div className="flex items-center">
                                    <FiPercent size={22} className="text-primary font-medium" />
                                 </div>
                                 <p className="text-white">java gui.MazeByDukeTran -g Eller -d WallFollower</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="w-full snap-center flex-special">
                     <div className="flex flex-col items-center space-y-10 px-10 pb-10 mx-auto">
                        <div className="w-3/4">
                           <h2 className="text-3xl text-left font-semibold mb-6">Sensor Reliability</h2>
                           <p className="text-xl text-left leading-relaxed">
                              The <span className="italic">r</span> flag controls the reliability of the robot&#39;s
                              sensors. This setting only affects the WallFollower, since the Wizard knows the path to
                              the exit and therefore does not need to make use of sensors, and the Manual driver is
                              controlled by you (and you don&#39;t have access to the sensors nor do you need them since
                              you can see the maze and its walls). In the gameplay below, you&#39;ll notice the robot
                              twitching/fidgeting at some points since the sensors in those directions are unreliable
                              (and therefore nonoperational at times), so it&#39;ll need to use its other operational
                              sensors to sense in that direction.
                           </p>
                        </div>
                        <div className="w-full flex justify-center space-x-4">
                           <div className="flex flex-col items-center">
                              <div className="w-min rounded-xl overflow-hidden">
                                 <Image
                                    alt="maze video 6"
                                    src="/img/maze/maze6.gif"
                                    width={299}
                                    height={297}
                                    layout="fixed"
                                 />
                              </div>
                              <div className="flex text-lg bg-slate-800 dark:bg-gray-800/75 dark-transition rounded-lg space-x-2 p-3 mt-4">
                                 <div className="flex items-center">
                                    <FiPercent size={22} className="text-primary font-medium" />
                                 </div>
                                 <p className="text-white">java gui.MazeByDukeTran -g Prim -d WallFollower -r 1010</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </ProjectLayout>
   );
};

interface InfoTipProps {
   text: string;
}

const InfoTip: FC<InfoTipProps> = ({ text }) => {
   return (
      <div className="flex items-center bg-zinc-200/75 dark:bg-zinc-800/75 text-zinc-700 dark:text-zinc-300 dark-transition rounded-xl gap-x-3 px-4 py-2 ml-5">
         <div>
            <FiInfo size={24} />
         </div>
         <p className="text-sm">{text}</p>
      </div>
   );
};

interface CodeFlagProps {
   flag: string;
   text: string;
}

const CodeFlag: FC<CodeFlagProps> = ({ flag, text }) => {
   return (
      <span className="text-zinc-300/75">
         [-{flag} <span className="italic">{text}</span>]
      </span>
   );
};

export default Maze;
