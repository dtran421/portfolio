import Image from "next/legacy/image";

export type LangProfileProps = {
  name: string;
  imgSrc: string;
  accentColor: string;
  darkText: boolean;
};

const LangProfile = ({ name, imgSrc, accentColor, darkText }: LangProfileProps) => (
  <div id="lang-profile" className="flex flex-col items-center">
    <div className="flex justify-center mt-4 mb-2 bg-zinc-300/30 dark:bg-zinc-700/30 dark-transition backdrop-blur-md rounded-full shadow-xl p-5 lg:p-6 w-20 h-20 lg:w-24 lg:h-24">
      <div className="flex justify-center items-center">
        <Image src={imgSrc} alt={`${name} logo`} width={54} height={54} layout="intrinsic" />
      </div>
    </div>
    <p
      style={{ backgroundColor: accentColor }}
      className={`w-5/6 rounded-full ${
        darkText ? "text-zinc-900" : "text-zinc-100"
      } font-semibold text-sm lg:text-base text-center py-1 my-2`}
    >
      {name}
    </p>
  </div>
);

export default LangProfile;
