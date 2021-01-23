import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

export interface SectionProps {
   heading: string;
}

function isInViewport(el) {
   const rect = el.getBoundingClientRect();
   return (
      // rect.top >= 0 ||
      // rect.left >= 0 ||
      // rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) ||
      // rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      rect.bottom - (rect.bottom - rect.top) / 4 >= 0
   );
}

const variants = {
   hidden: {
      opacity: 0,
      transition: {
         duration: 0.25,
         ease: "easeOut"
      }
   },
   visible: {
      opacity: 1,
      transition: {
         duration: 0.4,
         ease: "easeIn"
      }
   }
};

const Section: React.FunctionComponent<SectionProps> = ({ children, heading }) => {
   const animations = useAnimation();
   const section = useRef(null);

   const scrollListener = () => {
      const sectionVisible = isInViewport(section.current);
      sectionVisible ? animations.start("visible") : animations.start("hidden");
   };
   useEffect(() => {
      document.addEventListener("scroll", scrollListener);
   });

   return (
      <div id={heading.toLowerCase()} ref={section} className="mt-10 pt-10 h-full">
         <AnimatePresence>
            <motion.div
               className="flex flex-col h-full justify-start bg-gray-700 bg-opacity-50 rounded-xl py-16"
               initial="visible"
               animate={animations}
               variants={variants}>
               <p className="text-5xl text-center mb-10">
                  <span className="bg-gray-100 text-blue-600 px-3 py-1 rounded-md font-semibold">{heading}</span>
               </p>
               {children}
            </motion.div>
            )
         </AnimatePresence>
      </div>
   );
};

export default Section;
