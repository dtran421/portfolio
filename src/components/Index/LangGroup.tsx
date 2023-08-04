import Emoji from "@/components/Global/Emoji";
import { Language } from "@/lib/types";

import LangProfile from "./LangProfile";

type LangGroupProps = {
  heading: string;
  description: string;
  emoji: string;
  emojiLabel: string;
  languages: Language[];
};

const LangGroup = ({ heading, description, emoji, emojiLabel, languages }: LangGroupProps) => (
  <div>
    <div className="flex space-x-4">
      <Emoji
        label={emojiLabel}
        symbol={emoji}
        className="h-min flex items-center text-xl lg:text-2xl bg-zinc-200/75 dark:bg-zinc-700/75 dark-transition rounded-xl px-2 py-1 cursor-default"
      />
      <div className="flex flex-col space-y-2 pt-1">
        <h2 className="text-xl lg:text-2xl dark:text-white dark-transition font-semibold">{heading}</h2>
        <p className="lg:text-lg text-zinc-700 dark:text-zinc-300 dark-transition">{description}</p>
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 xl:gap-x-10 mx-10">
      {languages.map(({ name, img: { url: img }, accentColor, darkText }) => (
        <LangProfile key={name} {...{ name, img, accentColor, darkText }} />
      ))}
    </div>
  </div>
);

export default LangGroup;
