import { useMemo } from "react";
import Image from "next/image";
import { IconContext } from "react-icons";
import { FiDownload, FiMaximize2 } from "react-icons/fi";

type FilePreviewProps = {
  label: string;
  filePath: string;
  previewImgPath: string;
  width: number;
  height: number;
  addBg?: boolean;
};

const FilePreview = ({ label, filePath, previewImgPath, width, height, addBg = false }: FilePreviewProps) => {
  const iconContext = useMemo(
    () => ({
      className:
        "absolute z-20 w-10 h-10 md:w-14 md:h-14 lg:w-12 lg:h-12 xl:w-14 xl:h-14 group-hover:bg-gray-100 rounded-lg text-transparent group-hover:text-secondary transition duration-150 ease-linear p-2",
    }),
    []
  );

  const action = filePath.substring(filePath.indexOf(".") + 1) === "pdf" ? "view" : "download";

  return (
    <div className={`w-full h-full flex justify-center ${addBg ? "bg-white rounded-xl" : ""}`}>
      <a
        href={`/files${filePath}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative overflow-hidden w-full ${addBg ? "h-full" : ""} flex justify-center items-center group`}
      >
        <div className="absolute left-0 top-0 z-20 bg-primary/80 group-hover:bg-primary backdrop-blur-lg rounded-full px-2 md:px-3 md:py-1 m-1 md:m-3">
          <p className="text-sm md:text-lg text-white font-medium">{label}</p>
        </div>
        <IconContext.Provider value={iconContext}>
          {action === "view" ? <FiMaximize2 /> : <FiDownload />}
        </IconContext.Provider>
        <div className="absolute z-10 w-full h-full group-hover:bg-gray-800/60 transition duration-150 ease-in-out" />
        <Image alt={label} src={`/img${previewImgPath}`} width={width} height={height} className="rounded-xl" />
      </a>
    </div>
  );
};

export default FilePreview;
