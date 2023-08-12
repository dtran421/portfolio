import { useRef, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

import { isNullish } from "@/utils/Common";

interface GithubLinkProps {
  github: string;
  darkText?: boolean;
  compact?: boolean;
}

const GithubLink = ({ github, darkText, compact = false }: GithubLinkProps) => {
  const githubLink = useRef<HTMLInputElement>(null);
  const [isFocused, setFocused] = useState(false);
  const [isCopyActive, setCopyActive] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(github);
    setCopyActive(true);
    setTimeout(() => {
      setCopyActive(false);
    }, 3000);
  };

  let headingClass = "";
  if (!isNullish(darkText)) {
    headingClass = darkText ? "text-black" : "text-white";
  }

  return (
    <div className="flex justify-center items-center space-x-4">
      <p className={`${compact ? "text-sm md:text-lg" : "text-lg md:text-xl"} ${headingClass} font-medium`}>
        Github Repo
      </p>
      <div className="flex justify-center items-center bg-zinc-100 dark:bg-zinc-900 ring-2 ring-zinc-300 dark:ring-zinc-700/50 dark-transition rounded-lg">
        <button
          type="button"
          className={`${compact ? "w-40 md:w-64" : "w-56 md:w-80"} text-md xl:text-lg rounded-l-lg ${
            isFocused && "ring-2 ring-zinc-100/75"
          } px-3 py-1 cursor-default`}
          onClick={() => githubLink.current?.select()}
        >
          <input
            ref={githubLink}
            className="w-full bg-transparent dark:text-white focus:ring-0 focus:outline-none caret-transparent cursor-text"
            value={github}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            readOnly
          />
        </button>
        <button
          type="button"
          className={`w-10 h-8 xl:h-10 flex justify-center items-center ring-2 ${
            isCopyActive
              ? "text-green-500 ring-green-500"
              : "dark:text-white ring-zinc-300 dark:ring-zinc-700/50 hover:ring-zinc-400 dark:hover:ring-zinc-600"
          } rounded-r-lg bg-zinc-300/20 dark:bg-zinc-700/20 hover:bg-zinc-300/50 dark:hover:bg-zinc-700/50 transition duration-150 ease-linear`}
          onClick={() => copyToClipboard()}
          onBlur={() => setCopyActive(false)}
        >
          {isCopyActive ? <FiCheck size={18} /> : <FiCopy size={18} />}
        </button>
      </div>
    </div>
  );
};

export default GithubLink;
