import { FC } from "react";

interface IconProps {
   path: string;
}

const Icon: FC<IconProps> = ({ path }) => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         className="relative z-10 bg-white rounded-full"
         width="36"
         height="36"
         fill="#a855f7"
         viewBox="0 0 24 24">
         <path d={path} />
      </svg>
   );
};

export default Icon;
