import Image from "next/image";

export interface LangProfileProps {
   text: string;
   img: string;
   width: number;
   height: number;
   pillStyle: string;
}

const LangProfile: React.FunctionComponent<LangProfileProps> = ({ text, img, width, height, pillStyle }) => {
   return (
      <div className="flex flex-col col-span-1 justify-between rounded-lg">
         <div className="flex flex-row justify-center">
            <div className="flex justify-center mt-4 mb-2 bg-gray-700 rounded-full p-6 w-32 h-32 shadow-lg">
               <Image src={`/${img}.png`} width={width} height={height} />
            </div>
         </div>
         <p className={`rounded-full ${pillStyle} font-semibold text-xl text-center m-4 px-2 py-1`}>{text}</p>
      </div>
   );
};

export default LangProfile;
