import { FC } from "react";
import Image from "next/image";
import { FiInfo } from "react-icons/fi";

const JavaSection: FC<{}> = () => {
   return (
      <div className="w-full snap-x snap-mandatory scroll-smooth flex flex-nowrap overflow-x-scroll">
         <div className="w-full snap-center flex-special">
            <div className="w-full flex flex-col items-center px-4 lg:px-10 pb-10 mx-auto">
               <h2 className="w-full text-3xl text-left font-semibold mb-6">Intro</h2>
               <div className="flex flex-col lg:flex-row text-xl text-left leading-relaxed space-y-10 lg:space-y-0 lg:space-x-24">
                  <p className="w-full lg:w-1/2">
                     In order to run the Android version, you must have the Java Development Kit (JDK) Version 1.8
                     installed on your device. You can compile the project using Android Studio and emulate the game
                     with an Android SDK of at least version 29.
                  </p>
                  <p className="w-full lg:w-1/2">
                     Many of the command line parameters from the desktop version are adjustable within the game
                     straight from the main menu. For example, the maze generation algorithm can be selected before
                     beginning the game. The feature to load in a predefined file is implemented to load in the maze
                     generated from the previous playthrough of the game.
                  </p>
               </div>
            </div>
         </div>
         <div className="w-full snap-center flex-special">
            <div className="flex flex-col items-center space-y-10 px-4 lg:px-10 pb-10 mx-auto">
               <div className="w-full xl:w-3/4">
                  <h2 className="text-3xl text-left font-semibold mb-6">Gameplay</h2>
                  <p className="text-xl text-left leading-relaxed">
                     The maze gameplay is pretty much the exact same as the desktop version. In this version, you also
                     have the ability to jump by pressing the button at the bottom left of the maze screen. Before maze
                     generation, you can set the maze generation algorithm and the difficulty level from the main menu
                     by sliding the crossed swords. You also have the option to modify the gameplay (changing the driver
                     and sensor reliability) before entering the maze. If you need a little help to beat a maze, there
                     are options in the menu at the top left of the maze screen to toggle the map, solution, and maze
                     walls. The background color also fades to a brighter blue on the top half of the screen as you get
                     closer to the exit.
                  </p>
               </div>
               <div className="flex flex-col items-center">
                  <div className="w-min rounded-xl overflow-hidden">
                     <Image
                        alt="maze video 1 android"
                        src="/img/maze/amaze1.gif"
                        width={208}
                        height={430}
                        layout="fixed"
                     />
                  </div>
               </div>
            </div>
         </div>
         <div className="w-full snap-center flex-special">
            <div className="flex flex-col items-center space-y-10 px-4 lg:px-10 pb-10 mx-auto">
               <div className="w-full xl:w-3/4">
                  <h2 className="text-3xl text-left font-semibold mb-6">Automated Gameplay</h2>
                  <p className="text-xl text-left leading-relaxed">
                     Similar to the desktop version, you can choose to play using an automated robot driver. The options
                     are still the same with Wizard and WallFollower. As for sensor reliability, there are 4 choices you
                     can choose from, ranging from most reliable to most unreliable: Demigod, Warrior, Captain, Soldier.
                     The Demigod&#39;s sensors do not fail, one of the Warrior&#39;s sensors will periodically fail, two
                     for the Captain, and all four of the Soldier&#39;s sensors are susceptible to failing. You also
                     have the options to start/stop the animation, adjust the animation speed, and view the operational
                     status of the sensors.
                  </p>
               </div>
               <div className="w-full xl:w-2/3 flex flex-col md:flex-row justify-between items-center space-y-10 md:space-y-0 px-10 lg:px-20">
                  <div className="w-min rounded-xl overflow-hidden">
                     <Image
                        alt="maze video 2 android"
                        src="/img/maze/amaze2.gif"
                        width={208}
                        height={430}
                        layout="fixed"
                     />
                  </div>
                  <div className="w-min rounded-xl overflow-hidden">
                     <Image
                        alt="maze video 3 android"
                        src="/img/maze/amaze3.gif"
                        width={208}
                        height={430}
                        layout="fixed"
                     />
                  </div>
               </div>
            </div>
         </div>
         <div className="w-full snap-center flex-special">
            <div className="flex flex-col items-center space-y-10 px-4 lg:px-10 pb-10 mx-auto">
               <div className="w-full xl:w-3/4">
                  <h2 className="text-3xl text-left font-semibold mb-6">Revisiting a Maze</h2>
                  <p className="text-xl text-left leading-relaxed">
                     The Android version re-implements the desktop version&#39;s feature to load in a maze in a slightly
                     different way. Instead of storing the maze generation data, it stores the seed used to generate the
                     maze within the Android device&#39;s local storage. If you want to revisit a previously generated
                     maze, change the generation settings to match that of a previous maze and then click the Revisit
                     button. This will fetch the previous seed that matches the same settings and use it to re-generate
                     the maze.
                  </p>
               </div>
               <div className="w-full flex justify-center space-x-4">
                  <div className="flex flex-col items-center">
                     <div className="w-min rounded-xl overflow-hidden">
                        <Image
                           alt="maze video 4 android"
                           src="/img/maze/amaze4.gif"
                           width={208}
                           height={430}
                           layout="fixed"
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
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

export default JavaSection;
