import { useRef, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

type RepoCardProps = {
    name: string;
    url: string;
    tags: string[];
    accentColor: string;
};

const RepoCard = ({ name, url, tags, accentColor }: RepoCardProps) => {
    const [isHovered, setHovered] = useState(false);
    const toggleHover = () => setHovered(!isHovered);

    const githubLink = useRef(null);
    const [isFocused, setFocused] = useState(false);
    const [isCopyActive, setCopyActive] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        setCopyActive(true);
        setTimeout(() => {
            setCopyActive(false);
        }, 3000);
    };

    return (
        <div className="w-full flex justify-center xl:px-10 xl:py-4">
            <div
                onMouseEnter={() => toggleHover()}
                onMouseLeave={() => toggleHover()}
                className={`w-full flex flex-col justify-between bg-slate-300/50 dark:bg-slate-700/50 border-2 border-[${accentColor}] ${
                    isHovered
                        ? `hover:border-[${accentColor}]`
                        : "lg:border-slate-600/60"
                } dark-transition backdrop-blur-lg rounded-xl gap-y-3 lg:gap-y-4 p-4`}
            >
                <h1 className="text-lg md:text-xl font-medium text-left">
                    {name}
                </h1>
                <div className="flex justify-center items-center space-x-4">
                    <p className="w-1/3 text-sm md:text-lg text-white">
                        Github Repo
                    </p>
                    <div className="w-2/3 flex justify-between bg-zinc-100 dark:bg-zinc-900 ring-2 ring-zinc-300 dark:ring-zinc-700/50 dark-transition rounded-lg">
                        <button
                            type="button"
                            className={`w-full text-sm md:text-base rounded-l-lg ${
                                isFocused ? "ring-2 ring-zinc-100/75" : ""
                            } px-3 py-1 cursor-default`}
                            onClick={() => githubLink.current.select()}
                        >
                            <input
                                ref={githubLink}
                                className="w-full bg-transparent focus:ring-0 focus:outline-none caret-transparent cursor-text"
                                value={url}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                readOnly
                            />
                        </button>
                        <button
                            type="button"
                            className={`w-10 h-10 flex justify-center items-center ring-2 ${
                                isCopyActive
                                    ? "text-green-500 ring-green-500"
                                    : "ring-zinc-300 dark:ring-zinc-700/50 hover:ring-zinc-400 dark:hover:ring-zinc-600"
                            } rounded-r-lg bg-zinc-300/20 dark:bg-zinc-700/20 hover:bg-zinc-300/50 dark:hover:bg-zinc-700/50 transition duration-150 ease-linear`}
                            onClick={() => copyToClipboard()}
                            onBlur={() => setCopyActive(false)}
                        >
                            {isCopyActive ? (
                                <FiCheck size={18} />
                            ) : (
                                <FiCopy size={18} />
                            )}
                        </button>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <p
                            key={tag}
                            className="font-semibold text-sm xl:text-base text-gray-200 bg-purple-600 rounded-full px-4 py-1"
                        >
                            {tag}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RepoCard;
