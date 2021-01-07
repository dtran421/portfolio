import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Link } from "react-scroll";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

import Navbar from "../components/Global/Navbar";
import StickyBar from "../components/Global/StickyBar";
import LangProfile from "../components/Index/LangProfile";
import languages from "../public/languages.json";
import SocialProfile from "../components/Index/SocialProfile";
//import Socials from "../components/Index/Socials";

export interface IndexProps {}

function isInViewport(el) {
   const rect = el.getBoundingClientRect();
   return (
      // rect.top >= 0 ||
      // rect.left >= 0 ||
      // rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) ||
      // rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      rect.bottom > 0
   );
}

const socials = ["Github", "LinkedIn", "Facebook", "Twitter"];

const Index: React.FunctionComponent<IndexProps> = () => {
   const [showLearnMore, toggleLearnMore] = useState(true);
   const [showSticky, toggleSticky] = useState(false);

   const page1 = useRef(null);
   const scrollListener = () => {
      const page1Visible = isInViewport(page1.current);
      if (page1Visible === showSticky) {
         toggleLearnMore(page1Visible);
         toggleSticky(!showSticky);
      }
   };
   useEffect(() => {
      document.addEventListener("scroll", scrollListener);
   });

   return (
      <div>
         <div ref={page1} className="h-screen flex flex-col ">
            <Navbar />
            <div className="flex flex-col items-center mt-20">
               <div className="flex flex-col w-full pt-36 pb-14 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-500">
                  <div className="flex justify-center">
                     <p className="text-white text-5xl text-center py-5 pr-4">Hi! My name is </p>
                     <motion.div
                        className="flex items-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ ease: "easeOut", duration: 0.5 }}>
                        <p className="bg-gray-100 text-purple-600 text-5xl px-3 py-1 rounded-md font-bold">
                           Duke Tran!
                        </p>
                     </motion.div>
                  </div>
               </div>
               <div className="flex flex-col items-center px-16 pt-5 -m-12 max-w-screen-lg bg-gray-700 rounded-xl">
                  <p className="text-white text-2xl text-center pb-20">
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                     et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                     aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                     nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <AnimateSharedLayout>
                     <motion.div
                        layout
                        className="flex flex-row items-center justify-between w-5/6 h-16 px-16 py-2 mb-5 bg-gray-300 rounded-xl ">
                        {socials.map((name) => {
                           return <SocialProfile key={name} name={name} />;
                        })}
                     </motion.div>
                  </AnimateSharedLayout>
               </div>
            </div>

            {/* <div className="pt-5 pb-10"><Socials /></div> */}
            <AnimatePresence>
               {showLearnMore && (
                  <motion.div
                     key="learn_more"
                     className="mt-auto flex justify-center"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ ease: "easeOut", duration: 0.5 }}>
                     <Link to="page2" smooth={"easeOutCubic"} offset={25} duration={1000}>
                        <div
                           id="learn_more"
                           className="flex justify-center flex-col transition duration-500 transform hover:scale-110 py-5 cursor-pointer">
                           <p className=" text-white text-4xl text-center opacity-100">Learn more</p>
                           <img id="down_arrows" src="/down_arrows.svg" className="mt-2 py-4" />
                        </div>
                     </Link>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
         <AnimatePresence>
            {showSticky && (
               <motion.div
                  key="sticky_nav"
                  className="fixed top-0 w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: "linear", duration: 0.2 }}>
                  <StickyBar title="Portfolio" />
               </motion.div>
            )}
         </AnimatePresence>
         <div id="page2" className="h-screen pt-10">
            <div className="grid grid-cols-2 py-20 mx-auto">
               <div className="flex justify-center grid-span-1">
                  <img src="/profile.jpg" className="rounded-2xl" />
               </div>
               <div className="flex justify-end grid-span-1">
                  <div className="flex flex-col w-7/8 h-full bg-gradient-to-br from-indigo-400 to-purple-600 rounded-l-xl p-8 px-12">
                     <p className="text-5xl pt-14 pb-16">
                        <span className="bg-gray-100 text-blue-600 px-3 py-1 rounded-md font-semibold">About me</span>
                     </p>
                     <br />
                     <br />
                     <p className="text-2xl text-white">
                        Enim diam vulputate ut pharetra sit. Iaculis at erat pellentesque adipiscing commodo elit. Et
                        magnis dis parturient montes nascetur. Tincidunt eget nullam non nisi. Commodo quis imperdiet
                        massa tincidunt nunc pulvinar sapien. Volutpat ac tincidunt vitae semper quis lectus nulla at.
                        Varius vel pharetra vel turpis nunc eget. Nulla facilisi etiam dignissim diam quis. Euismod
                        lacinia at quis risus sed vulputate odio ut enim.
                     </p>
                  </div>
               </div>
            </div>
         </div>
         <div className="h-screen pt-20">
            <div className="flex flex-col justify-center bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-500 max-w-screen-xl px-10 mx-auto rounded-xl">
               <p className="text-5xl text-center pt-14 pb-8">
                  <span className="bg-gray-100  text-purple-600 px-3 py-1 rounded-md font-semibold">Technologies</span>
               </p>
               <p className="text-2xl text-white p-5 pb-10">
                  Enim diam vulputate ut pharetra sit. Iaculis at erat pellentesque adipiscing commodo elit. Et magnis
                  dis parturient montes nascetur. Tincidunt eget nullam non nisi. Commodo quis imperdiet massa tincidunt
                  nunc pulvinar sapien. Volutpat ac tincidunt vitae semper quis lectus nulla at. Varius vel pharetra vel
                  turpis nunc eget. Nulla facilisi etiam dignissim diam quis. Euismod lacinia at quis risus sed
                  vulputate odio ut enim. Vitae auctor eu augue ut lectus arcu bibendum at.
               </p>
               <div className="flex flex-col">
                  <div className="grid grid-cols-2 py-10 border-t-4 border-gray-300">
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
                  <div className="col-span-1"></div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Index;
