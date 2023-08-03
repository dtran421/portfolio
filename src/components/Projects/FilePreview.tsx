import Image from "next/image";
import { FiDownload, FiMaximize2 } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";

import { lgScreenQuery, mdScreenQuery } from "../../lib/Breakpoints";

type FilePreviewProps = {
  label: string;
  filePath: string;
  previewImgPath: string;
  width: number;
  height: number;
  special?: boolean;
};

const FilePreview = ({ label, filePath, previewImgPath, width, height, special = false }: FilePreviewProps) => {
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
    size: resizeIconSize,
  };

  const action = filePath.substring(filePath.indexOf(".") + 1) === "pdf" ? "view" : "download";

  return (
    <div className={`w-full flex justify-center ${special ? "bg-white rounded-xl" : ""}`}>
      <a
        href={`/files${filePath}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative overflow-hidden w-full ${special ? "h-full" : ""} flex justify-center items-center group`}
      >
        <div className="absolute left-0 top-0 z-20 bg-primary/80 group-hover:bg-primary backdrop-blur-lg rounded-full px-2 md:px-3 md:py-1 m-1 md:m-3">
          <p className="text-sm md:text-lg text-white font-medium">{label}</p>
        </div>
        {action === "view" ? <FiMaximize2 {...iconProps} /> : <FiDownload {...iconProps} />}
        <div className="absolute z-10 w-full h-full group-hover:bg-gray-800/60 transition duration-150 ease-in-out" />
        <Image alt={label} src={`/img${previewImgPath}`} {...{ width, height }} className="rounded-xl" />
      </a>
    </div>
  );
};

export default FilePreview;
