import { FC } from "react";
import { MdSchool } from "react-icons/md";

const Timeline: FC<{}> = () => {
   return (
      <div className="container mx-auto w-full h-full">
         <div className="relative wrap overflow-hidden p-10 h-full">
            <div className="absolute left-1/2 h-full border border-gray-400/75"></div>
            <Event side="L" />
            <Event side="R" />
            <Event side="L" />
            <Event side="R" />
         </div>
      </div>
   );
};

interface EventProps {
   side: string;
}

const Event: FC<EventProps> = ({ side }) => {
   return (
      <div className={`mb-8 flex ${side === "R" && "flex-row-reverse"} justify-between items-center w-full`}>
         <Card side={side} />
         <div className="z-10 w-8 h-8 flex items-center order-1 bg-gray-300 backdrop-blur-lg rounded-full">
            <h1 className="mx-auto font-semibold">
               <MdSchool className="text-gray-800" size={20} />
            </h1>
         </div>
         <div className={`order-1 w-5/12 flex ${side === "L" ? "justify-start" : "justify-end"}`}>
            <p className="bg-gray-300 text-black rounded-lg px-4 py-1">May 2019</p>
         </div>
      </div>
   );
};

interface CardProps {
   side: string;
}

const Card: FC<CardProps> = ({ side }) => {
   return (
      <div
         className={`order-1 ${side === "L" ? "bg-purple-500" : "bg-blue-500"} rounded-lg shadow-xl w-5/12 px-6 py-4`}>
         <h3 className="mb-3 font-bold text-white text-xl">Lorem Ipsum</h3>
         <p className="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
         </p>
      </div>
   );
};

export default Timeline;
