import Image from "next/image";

export type LangProfileProps = {
    text: string;
    img: string;
    width: number;
    height: number;
    darkText: boolean;
};

const LangProfile: React.FunctionComponent<LangProfileProps> = ({
    text,
    img,
    width,
    height,
    darkText
}) => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-center mt-4 mb-2 bg-zinc-300/30 dark:bg-zinc-700/30 dark-transition backdrop-blur-md rounded-full shadow-xl p-5 lg:p-6 w-20 h-20 lg:w-24 lg:h-24">
                <div className="flex justify-center items-center">
                    <Image
                        src={`/icons/${img}`}
                        alt="test"
                        {...{ width, height }}
                    />
                </div>
            </div>
            <p
                className={`w-5/6 rounded-full bg-${img.substring(
                    0,
                    img.indexOf(".")
                )} ${
                    darkText ? "text-zinc-900" : "text-zinc-100"
                } font-semibold text-sm lg:text-md text-center py-1 my-2`}
            >
                {text}
            </p>
        </div>
    );
};

export default LangProfile;
