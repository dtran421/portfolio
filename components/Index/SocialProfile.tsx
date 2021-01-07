import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface SocialProfileProps {
   name: string;
}

const logoMotion = {
   inactive: { translateX: 0 },
   hover: {
      translateX: -20
   }
};

const textMotion = {
   inactive: { opacity: 0, x: -50, ease: "easeOut", duration: 0.3, type: "tween" },
   hover: {
      opacity: 1,
      x: 0,
      ease: "easeIn",
      duration: 0.5,
      type: "tween"
   }
};

const SocialProfile: React.FunctionComponent<SocialProfileProps> = ({ name }) => {
   const [textVisible, showText] = useState(false);

   return (
      <AnimatePresence>
         <motion.div
            layout
            className="flex flex-row h-full items-center mx-10 cursor-pointer"
            initial="inactive"
            whileHover="hover"
            onHoverStart={(e) => {
               showText(true);
            }}
            onHoverEnd={(e) => {
               showText(false);
            }}
            animate="initial">
            <motion.div layout variants={logoMotion} className="flex items-center mr-4">
               <Image src={`/${name.toLowerCase()}.svg`} width={50} height={50} layout="fixed" />
            </motion.div>
            <AnimatePresence>
               {textVisible && (
                  <motion.p layout variants={textMotion} className=" text-purple-500 text-2xl font-bold">
                     {name}
                  </motion.p>
               )}
            </AnimatePresence>
         </motion.div>
      </AnimatePresence>
   );
};

export default SocialProfile;
