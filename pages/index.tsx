import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Link } from "react-scroll";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

import Navbar from "../components/Global/Navbar";
import StickyBar from "../components/Global/StickyBar";
import LangProfile from "../components/Index/LangProfile";
import languages from "../public/languages.json";
import SocialProfile from "../components/Index/SocialProfile";
import socials from "../public/socials.json";

export interface IndexProps {}

export function isInViewport(el) {
   const rect = el.getBoundingClientRect();
   return (
      // rect.top >= 0 ||
      // rect.left >= 0 ||
      // rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) ||
      // rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      rect.bottom >= 0
   );
}

const learnMoreVariants = {
   hidden: {
      scale: 0.25,
      opacity: 0,
      transition: {
         duration: 0.2,
         ease: "easeOut"
      }
   },
   visible: {
      scale: 1,
      opacity: 1,
      transition: {
         duration: 0.3,
         ease: "linear"
      }
   }
};

const stickyVariants = {
   hidden: {
      opacity: 0,
      transition: {
         duration: 0.2,
         ease: "easeOut"
      }
   },
   visible: {
      opacity: 1,
      transition: {
         duration: 0.25,
         ease: "easeOut"
      }
   }
};

const Index: React.FunctionComponent<IndexProps> = () => {
   const learnMoreAnimations = useAnimation();
   const stickyAnimations = useAnimation();

   const [showSticky, toggleSticky] = useState(false);

   const page1 = useRef(null);
   const scrollListener = () => {
      const page1Visible = isInViewport(page1.current);
      if (page1Visible) {
         learnMoreAnimations.start("visible");
         stickyAnimations.start("hidden");
      } else {
         learnMoreAnimations.start("hidden");
         stickyAnimations.start("visible");
      }
      toggleSticky(!page1Visible);
      console.log(showSticky);
   };
   useEffect(() => {
      document.addEventListener("scroll", scrollListener);
   });

   return (
      <div>
         <div ref={page1} className="h-screen flex flex-col ">
            <Navbar page="Main" />
            <div className="flex flex-col items-center">
               <div className="flex flex-col items-center w-full pt-36 pb-14 bg-banner-img bg-center">
                  <div className="flex justify-center bg-gray-700 bg-opacity-60 rounded-3xl px-4">
                     <p className="text-white text-5xl text-center py-5 pr-4">Hi! My name is </p>
                     <motion.div
                        className="flex items-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ ease: "easeOut", duration: 0.25 }}>
                        <p className="bg-gray-100 text-purple-600 ring-4 ring-purple-400 text-5xl px-3 py-1 rounded-md font-bold">
                           Duke Tran!
                        </p>
                     </motion.div>
                  </div>
               </div>
               <div className="flex flex-col items-center px-16 pt-10 -m-12 max-w-screen-lg bg-gradient-to-tr from-blue-800 to-blue-700 rounded-xl">
                  <p className="text-white text-2xl text-center pb-28 leading-relaxed">
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                     et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                     aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                     nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <div className="flex flex-row items-center justify-between w-5/6 h-16 px-10 py-2 mb-10 rounded-xl">
                     {socials.list.map((social) => {
                        return <SocialProfile key={social.type} {...social} />;
                     })}
                  </div>
               </div>
            </div>
            <AnimatePresence>
               <motion.div
                  key="learn_more"
                  className="mt-auto flex justify-center"
                  animate={learnMoreAnimations}
                  variants={learnMoreVariants}>
                  <Link to="page2" smooth={"easeOutCubic"} offset={25} duration={1000}>
                     <div
                        id="learn_more"
                        className="flex justify-center flex-col transition duration-500 transform hover:scale-110 py-5 cursor-pointer">
                        <p className=" text-white text-4xl text-center opacity-100">Learn more</p>
                        <img id="down_arrows" src="/down_arrows.svg" className="mt-2 py-4" />
                     </div>
                  </Link>
               </motion.div>
            </AnimatePresence>
         </div>
         <AnimatePresence>
            {showSticky && (
               <motion.div key="sticky_nav" initial="hidden" animate={stickyAnimations} variants={stickyVariants}>
                  <StickyBar title="Portfolio" />
               </motion.div>
            )}
         </AnimatePresence>
         <div id="page2" className="pt-10 px-10">
            <div className="grid grid-cols-2 mx-auto">
               <div className="flex justify-center col-span-1">
                  <div className="flex items-start pt-10">
                     <Image src="/profile.jpg" width={400} height={650} className="rounded-2xl z-0" />
                  </div>
               </div>
               <div className="flex justify-end col-span-1">
                  <div className="flex flex-col h-2/3 rounded-xl p-12 mt-10 bg-gradient-to-tr from-blue-800 to-blue-700">
                     <p className="text-5xl pb-14">
                        <span className="bg-gray-100 text-blue-600 px-3 py-1 rounded-md font-semibold">About me</span>
                     </p>
                     <p className="text-2xl text-white leading-loose">
                        Enim diam vulputate ut pharetra sit. Iaculis at erat pellentesque adipiscing commodo elit. Et
                        magnis dis parturient montes nascetur. Tincidunt eget nullam non nisi. Commodo quis imperdiet
                        massa tincidunt nunc pulvinar sapien. Volutpat ac tincidunt vitae semper quis lectus nulla at.
                        Varius vel pharetra vel turpis nunc eget.
                     </p>
                  </div>
               </div>
            </div>
            <div className="grid grid-cols-2 mx-auto -mt-48">
               <div className="flex items-center col-span-1 mt-24">
                  <div className="p-12 rounded-xl bg-gradient-to-tr from-blue-800 to-blue-700">
                     <p className="text-2xl text-white leading-loose">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                     </p>
                  </div>
               </div>
               <div className="flex justify-center col-span-1 py-10">
                  <div>
                     <Image src="/outside.jpg" width={400} height={625} className="rounded-2xl z-0" />
                  </div>
               </div>
            </div>
         </div>
         <div className="pt-32">
            <div className="flex flex-col justify-center max-w-screen-xl px-10 mx-auto rounded-xl">
               <div className="flex flex-col bg-gradient-to-tr from-blue-800 to-blue-700 rounded-xl">
                  <p className="text-5xl text-center pt-14 pb-8">
                     <span className="bg-gray-100  text-blue-600 px-3 py-1 rounded-md font-semibold">Technologies</span>
                  </p>
                  <p className="text-2xl text-white px-10 pb-10">
                     Enim diam vulputate ut pharetra sit. Iaculis at erat pellentesque adipiscing commodo elit. Et
                     magnis dis parturient montes nascetur. Tincidunt eget nullam non nisi. Commodo quis imperdiet massa
                     tincidunt nunc pulvinar sapien. Volutpat ac tincidunt vitae semper quis lectus nulla at. Varius vel
                     pharetra vel turpis nunc eget. Nulla facilisi etiam dignissim diam quis. Euismod lacinia at quis
                     risus sed vulputate odio ut enim. Vitae auctor eu augue ut lectus arcu bibendum at.
                  </p>
                  <div className="grid grid-cols-2 p-10">
                     <div className="grid grid-cols-3 col-span-1 gap-x-10 w-full border-r-4 border-gray-300 pr-10">
                        <div className="col-span-3">
                           <p className="text-3xl text-center pb-12">
                              <span className="bg-gray-100  text-blue-600 px-3 py-1 rounded-md font-semibold">
                                 Experienced
                              </span>
                           </p>
                        </div>
                        {languages.experienced.map((lang) => {
                           return <LangProfile key={lang.text} {...lang} />;
                        })}
                     </div>
                     <div className="grid grid-cols-3 col-span-1 gap-x-10 w-full pl-10">
                        <div className="col-span-3">
                           <p className="text-3xl text-center pb-12">
                              <span className="bg-gray-100  text-blue-600 px-3 py-1 rounded-md font-semibold">
                                 Learning
                              </span>
                           </p>
                        </div>
                        {languages.learning.map((lang) => {
                           return <LangProfile key={lang.text} {...lang} />;
                        })}
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="pt-32">
            <div className="flex flex-col items-center">
               <p className=" text-center pb-12">
                  <span className="text-5xl bg-gray-100  text-blue-600 px-3 py-1 rounded-md font-semibold">
                     Projects
                  </span>
               </p>
               <p className="text-2xl text-white px-10 pb-10 max-w-screen-xl">
                  Enim diam vulputate ut pharetra sit. Iaculis at erat pellentesque adipiscing commodo elit. Et magnis
                  dis parturient montes nascetur. Tincidunt eget nullam non nisi. Commodo quis imperdiet massa tincidunt
                  nunc pulvinar sapien.
               </p>
               <div className="grid grid-cols-3 gap-14 max-w-screen-lg pb-20">
                  <div className="flex flex-col col-span-1 px-4 rounded-xl bg-gradient-to-tr from-blue-800 to-blue-700">
                     <div className="flex justify-center">
                        <p className="text-white text-2xl m-2 pb-1 border-b-4 border-white">Kickflip</p>
                     </div>
                     <div className="flex w-full justify-center p-5">
                        <Image src="/typescript.png" width={100} height={100} />
                     </div>
                  </div>
                  <div className="flex flex-col col-span-1 px-4 rounded-xl bg-gradient-to-tr from-blue-800 to-blue-700">
                     <div className="flex justify-center">
                        <p className="text-white text-2xl m-2 pb-1 border-b-4 border-white">Whispearrings</p>
                     </div>
                     <div className="flex w-full justify-center p-5">
                        <Image src="/typescript.png" width={100} height={100} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Index;
