import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { FiMaximize2, FiDownload } from "react-icons/fi";

import { mdScreenQuery, lgScreenQuery } from "../../configs/Breakpoints";

type FilePreviewProps = {
    filePath: string;
    altText: string;
    previewImgPath: string;
    width: number;
    height: number;
    special?: boolean;
};

const FilePreview = ({
    filePath,
    altText,
    previewImgPath,
    width,
    height,
    special = false
}: FilePreviewProps) => {
    const mdScreen = useMediaQuery(mdScreenQuery);
    const lgScreen = useMediaQuery(lgScreenQuery);

    let resizeIconSize = 48;
    if (lgScreen) {
        resizeIconSize = 56;
    } else if (mdScreen) {
        resizeIconSize = 64;
    }
    const iconProps = {
        className:
            "absolute z-20 group-hover:bg-gray-100 rounded-xl text-transparent group-hover:text-secondary transition duration-150 ease-linear p-2",
        size: resizeIconSize
    };

    const action =
        filePath.substring(filePath.indexOf(".") + 1) === "pdf"
            ? "view"
            : "download";

    return (
        <div
            className={`w-full flex justify-center ${
                special ? "bg-white rounded-xl" : ""
            }`}
        >
            <a
                href={`/files${filePath}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative overflow-hidden w-full ${
                    special ? "h-full" : ""
                } flex justify-center items-center group`}
            >
                {action === "view" ? (
                    <FiMaximize2 {...iconProps} />
                ) : (
                    <FiDownload {...iconProps} />
                )}
                <div className="absolute z-10 w-full h-full group-hover:bg-gray-800/60 transition duration-150 ease-in-out" />
                <Image
                    alt={altText}
                    src={`/img${previewImgPath}`}
                    {...{ width, height }}
                    className="rounded-xl"
                />
            </a>
        </div>
    );
};

export default FilePreview;
