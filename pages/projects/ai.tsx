import { Dispatch, SetStateAction, useState } from "react";
import _ from "lodash";

import {
    FiChevronDown,
    FiChevronRight,
    FiFile,
    FiFileText,
    FiFolder,
    FiImage
} from "react-icons/fi";
import aiData from "../../public/json/ai.json";

import ProjectLayout from "../../components/Global/layouts/ProjectLayout";

type FileProps = {
    idx: number;
    text: string;
    src: string;
};

const File = ({ idx, text, src }: FileProps) => {
    let type;
    switch (src.split(".")[1]) {
        case "jpeg":
            type = "image";
            break;
        case "mat":
            type = "data";
            break;
        default:
            type = "text";
    }

    return (
        <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center text-lg lg:text-xl ${
                idx % 2 === 1 && "bg-slate-400/25 dark:bg-slate-600/25"
            } hover:bg-secondary/40 dark:hover:bg-secondary/60 rounded-lg space-x-2 px-16 py-2`}
        >
            <div>
                {type === "text" && <FiFileText size={20} />}
                {type === "image" && <FiImage size={20} />}
                {type === "data" && <FiFile size={20} />}
                {type === "folder" && <FiFolder size={20} />}
            </div>
            <p>{text}</p>
        </a>
    );
};

type FolderProps = {
    altColor: boolean;
    name: string;
    contents?: string[];
    isExpanded?: boolean;
    foldersExpanded?: string[];
    numFiles?: number;
    setFoldersExpanded?: Dispatch<SetStateAction<[string[], number]>>;
};

const Folder = ({
    altColor,
    name,
    contents,
    isExpanded,
    foldersExpanded,
    numFiles,
    setFoldersExpanded
}: FolderProps) => (
    <div className="flex flex-col">
        <div
            className={`flex items-center text-lg lg:text-xl ${
                altColor
                    ? "bg-slate-400/25 dark:bg-slate-600/25"
                    : "bg-transparent"
            } rounded-lg space-x-2 px-4 py-2`}
        >
            {contents && (
                <>
                    <button
                        type="button"
                        onClick={() =>
                            isExpanded
                                ? setFoldersExpanded([
                                      foldersExpanded.filter(
                                          (folder) => folder !== name
                                      ),
                                      numFiles - contents.length
                                  ])
                                : setFoldersExpanded([
                                      [...foldersExpanded, name],
                                      numFiles + contents.length
                                  ])
                        }
                    >
                        {isExpanded ? (
                            <FiChevronDown size={18} />
                        ) : (
                            <FiChevronRight size={18} />
                        )}
                    </button>
                    <FiFolder size={20} />
                </>
            )}
            <p className={!contents ? "text-transparent" : ""}>{name}</p>
        </div>
        {isExpanded && (
            <div className="flex flex-col">
                {contents.map((file, idx) => {
                    const explorerIdx = idx + (altColor ? 0 : 1);
                    return (
                        <File
                            key={explorerIdx}
                            idx={explorerIdx}
                            text={file}
                            src={`/files/ai/${name}/${file}`}
                        />
                    );
                })}
            </div>
        )}
    </div>
);

const AI = () => {
    const { folders } = aiData;

    const maxFiles = 14;
    let currIdx = 0;
    const [[foldersExpanded, numFiles], setFoldersExpanded] = useState([
        [],
        folders.length
    ]);

    return (
        <ProjectLayout page="Machine Learning" accent="bg-ai" darkText>
            <div className="md:max-w-2xl lg:max-w-4xl xl:max-w-6xl flex mx-10 md:mx-auto">
                <div className="w-full max-h-screen flex flex-col items-center bg-slate-300/50 dark:bg-slate-700/50 dark-transition backdrop-blur-lg rounded-xl p-6 lg:p-10 mt-20">
                    <h1 className="w-full text-4xl lg:text-6xl font-bold">
                        File Explorer
                    </h1>
                    <div className="w-full overflow-y-auto flex flex-col mt-10">
                        {folders.map((folder, idx) => {
                            if (idx > 0) {
                                const prevFolder = folders[idx - 1];
                                if (foldersExpanded.includes(prevFolder.name)) {
                                    currIdx += prevFolder.contents.length + 1;
                                    return (
                                        <Folder
                                            key={folder.name}
                                            altColor={currIdx % 2 === 1}
                                            isExpanded={foldersExpanded.includes(
                                                folder.name
                                            )}
                                            {...{
                                                ...folder,
                                                foldersExpanded,
                                                numFiles,
                                                setFoldersExpanded
                                            }}
                                        />
                                    );
                                }
                                currIdx += 1;
                                return (
                                    <Folder
                                        key={folder.name}
                                        altColor={currIdx % 2 === 1}
                                        isExpanded={foldersExpanded.includes(
                                            folder.name
                                        )}
                                        {...{
                                            ...folder,
                                            foldersExpanded,
                                            numFiles,
                                            setFoldersExpanded
                                        }}
                                    />
                                );
                            }
                            currIdx = 0;
                            return (
                                <Folder
                                    key={folder.name}
                                    altColor={false}
                                    isExpanded={foldersExpanded.includes(
                                        folder.name
                                    )}
                                    {...{
                                        ...folder,
                                        foldersExpanded,
                                        numFiles,
                                        setFoldersExpanded
                                    }}
                                />
                            );
                        })}
                        {_.times(
                            maxFiles > numFiles ? maxFiles - numFiles : 0,
                            (idx) => {
                                if (idx === 0) {
                                    currIdx = numFiles;
                                } else {
                                    currIdx += 1;
                                }
                                return (
                                    <Folder
                                        key={idx}
                                        altColor={currIdx % 2 === 1}
                                        name="_"
                                    />
                                );
                            }
                        )}
                    </div>
                </div>
            </div>
        </ProjectLayout>
    );
};

export default AI;
