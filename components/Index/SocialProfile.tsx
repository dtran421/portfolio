import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface SocialProfileProps {
   type: string;
   name: string;
   link: string;
}

const logoMotion = {
   inactive: { x: 0 },
   hover: {
      x: -15
   }
};

const textMotion = {
   inactive: { opacity: 0, x: -40, ease: "easeOut", duration: 0.25, type: "tween" },
   hover: {
      opacity: 1,
      x: -10,
      ease: "easeIn",
      duration: 0.5,
      type: "tween"
   }
};

const SocialProfile: React.FunctionComponent<SocialProfileProps> = ({ type, name, link }) => {
   const [textVisible, showText] = useState(false);

   return (
      <AnimatePresence>
         <motion.div
            layout
            className="flex flex-row h-full items-center cursor-pointer"
            initial="inactive"
            whileHover="hover"
            onHoverStart={(e) => {
               showText(true);
            }}
            onHoverEnd={(e) => {
               showText(false);
            }}
            animate="initial">
            <motion.div layout variants={logoMotion} className="flex items-center">
               <Image src={`/${type.toLowerCase()}.svg`} width={50} height={50} layout="fixed" />
            </motion.div>
            <AnimatePresence>
               {textVisible && (
                  <motion.p layout variants={textMotion} className=" text-gray-200 text-2xl">
                     {name}
                  </motion.p>
               )}
            </AnimatePresence>
         </motion.div>
      </AnimatePresence>
   );
};

export default SocialProfile;
