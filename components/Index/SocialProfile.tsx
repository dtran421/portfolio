import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Icon from "./Icon";

interface SocialProfileProps {
   type: string;
   name: string;
   link: string;
   icon: string;
}

const logoMotion = {
   inactive: { x: 0 },
   hover: {
      x: -15
   }
};

const textMotion = {
   inactive: { opacity: 0, x: -60, ease: "easeOut", duration: 0.25, type: "tween" },
   hover: {
      opacity: 1,
      x: -35,
      ease: "easeIn",
      duration: 0.5,
      type: "tween"
   }
};

const SocialProfile: FC<SocialProfileProps> = ({ name, link, icon }) => {
   return (
      <AnimatePresence>
         <motion.a
            className="h-full flex items-center cursor-pointer px-12"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            initial="inactive"
            whileHover="hover"
            animate="initial">
            <motion.div variants={logoMotion} className="flex relative items-center">
               <Icon path={icon} />
               <motion.p variants={textMotion} className="absolute left-20 text-gray-200 text-xl">
                  {name}
               </motion.p>
            </motion.div>
         </motion.a>
      </AnimatePresence>
   );
};

export default SocialProfile;
