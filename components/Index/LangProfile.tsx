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
      <div>
         <div className="flex flex-row justify-center">
            <div className="flex justify-center mt-4 mb-2 bg-gray-700/30 backdrop-blur-md rounded-full p-6 w-24 h-24 shadow-lg">
               <Image src={`/icons/${img}.png`} alt="test" width={width} height={height} />
            </div>
         </div>
         <p
            className={`rounded-full bg-${img} ${
               darkText ? "text-gray-800" : "text-white"
            } font-semibold text-center mx-6 my-2 px-2 py-1 shadow-lg`}>
            {text}
         </p>
      </div>
   );
};

export default LangProfile;
