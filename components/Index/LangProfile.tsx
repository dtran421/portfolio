import Image from "next/image";

export interface LangProfileProps {
   text: string;
   img: string;
   width: number;
   height: number;
   darkText: boolean;
}

const LangProfile: React.FunctionComponent<LangProfileProps> = ({ text, img, width, height, darkText }) => {
   return (
      <div className="flex flex-col items-center">
         <div className="flex justify-center mt-4 mb-2 bg-gray-300/30 dark:bg-gray-700/30 dark-transition backdrop-blur-md rounded-full p-5 lg:p-6 w-20 h-20 lg:w-24 lg:h-24 shadow-md">
            <Image src={`/icons/${img}.png`} alt="test" {...{ width, height }} />
         </div>
         <p
            className={`w-5/6 rounded-full bg-${img} ${
               darkText ? "text-gray-800" : "text-white"
            } font-semibold text-sm lg:text-md text-center py-1 my-2`}>
            {text}
         </p>
      </div>
   );
};

export default LangProfile;
