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
   return (
      <AnimatePresence>
         <motion.a
            className="h-full items-center cursor-pointer"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            initial="inactive"
            whileHover="hover"
            animate="initial">
            <motion.div variants={logoMotion} className="flex relative items-center">
               <motion.p variants={textMotion} className="absolute left-20 text-gray-200 text-2xl">
                  {name}
               </motion.p>
               <Image src={`/${type.toLowerCase()}.svg`} width={50} height={50} layout="fixed" />
            </motion.div>
         </motion.a>
      </AnimatePresence>
   );
};

export default SocialProfile;
