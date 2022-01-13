import { FC, useEffect } from "react";

import { SubsectionType } from "./Subsection";
import Subsection from "./Subsection";

interface SectionProps {
   type: string;
   heading: string;
   body: (SubsectionType | string)[];
}

const Section: FC<SectionProps> = ({ type, heading, body }) => {
   return (
      <div className="flex flex-col bg-gray-300/25 dark:bg-gray-700/50 dark-transition rounded-xl px-6 lg:px-10 py-6">
         <p
            className={`text-2xl lg:text-3xl text-center dark-transition font-semibold px-3 py-1 ${
               type === "Tabs" ? "mb-6" : "mb-4"
            }`}>
            {heading}
         </p>
         {type === "Tabs" ? (
            body.map((content: SubsectionType, idx, arr) => {
               let style;
               if (idx === 0) style = "border-b-4 border-gray-300 dark:border-gray-600 dark-transition pb-6";
               else if (idx + 1 === arr.length) style = "pt-6";
               else style = "border-b-4 border-gray-300 dark:border-gray-600 dark-transition py-6";
               return <Subsection key={idx} {...{ content, style }} />;
            })
         ) : (
            <div className="flex flex-wrap justify-center">
               {body.map((content, idx) => {
                  return (
                     <p
                        key={idx}
                        className="bg-secondary text-white text-center rounded-full lg:text-lg px-6 lg:px-3 py-1 mx-2 my-1">
                        {content}
                     </p>
                  );
               })}
            </div>
         )}
      </div>
   );
};

export default Section;
