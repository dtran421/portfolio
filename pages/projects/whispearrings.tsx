import { FC } from "react";
import Image from "next/image";

import ProjectLayout from "../../components/Global/layouts/ProjectLayout";

const Whispearrings: FC<{}> = () => {
   return (
      <ProjectLayout
         page="Whispearrings"
         accent="bg-whispearrings"
         darkText={true}
         github="https://github.com/dtran421/Whispearrings-swift">
         <div className="md:max-w-2xl lg:max-w-4xl xl:max-w-6xl flex flex-col items-center gap-y-32 mx-10 md:mx-auto">
            <div className="w-3/4 flex flex-col items-center space-y-6 mt-20">
               <h1 className="text-4xl font-semibold">Background & Motivation</h1>
               <p className="text-xl text-center leading-relaxed">
                  {`For my summer internship with Whispearrings, I was the sole mobile app developer in charge
                  of spearheading the development of their iOS app. Since this was my first time doing mobile app
                  development, I needed to research various new technologies, including XCode, Swift (Objective-C), and
                  SQLite for the database. After two short but grueling months, I was able to produce an app that incorporated
                  all of the techniques and coding concepts that I had been learning and performed the basic functions that
                  my supervisors had asked for.`}
               </p>
            </div>
            <div className="w-full flex justify-center space-x-32">
               <div className="w-1/2 flex items-center">
                  <p className="text-xl leading-relaxed">
                     The core function of the app was to play whispers to the user at certain times throughout the day.
                     I successfully managed to design an appealing and functional UI that enabled users to play back
                     audio files saved within the app. More importantly, these whispers were stored within a queue that
                     could be managed by the user (whispers could be manually added and removed).
                  </p>
               </div>
               <div className="flex justify-center">
                  <Image alt="whispearrings video 1" src="/img/whispearrings1.gif" width={240} height={520} />
               </div>
            </div>
         </div>
      </ProjectLayout>
   );
};

export default Whispearrings;
