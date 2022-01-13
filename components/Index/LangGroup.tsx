import { FC } from "react";

import languages from "../../public/json/languages.json";

import Emoji from "../Global/Emoji";
import LangProfile from "./LangProfile";

interface LangGroupProps {
   name: string;
   desc: string;
   emoji: string;
   emojiLabel: string;
}

const LangGroup: FC<LangGroupProps> = ({ name, desc, emoji, emojiLabel }) => {
   return (
      <div>
         <div className="flex space-x-4">
            <Emoji
               label={emojiLabel}
               symbol={emoji}
               className="h-min flex items-center text-xl lg:text-2xl bg-gray-200/75 dark:bg-gray-700/75 dark-transition rounded-xl px-2 py-1 cursor-default"
            />
            <div className="flex flex-col space-y-2 pt-1">
               <h2 className="text-xl lg:text-2xl dark:text-white dark-transition font-semibold">{name}</h2>
               <p className="lg:text-lg text-gray-700 dark:text-gray-300 dark-transition">{desc}</p>
            </div>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 xl:gap-x-10 pb-4 mx-10">
            {languages[name.toLowerCase()].map((lang) => {
               return <LangProfile key={lang.text} {...lang} />;
            })}
         </div>
      </div>
   );
};

export default LangGroup;
