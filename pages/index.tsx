import { useState, useEffect, useRef, FC } from "react";
import Image from "next/image";
import { Link } from "react-scroll";
import Typewriter from "typewriter-effect";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

import languages from "../public/json/languages.json";
import socials from "../public/json/socials.json";
import carousel from "../public/json/carousel.json";

import Navbar from "../components/Global/Navbar";
import Emoji from "../components/Global/Emoji";
import SocialProfile from "../components/Index/SocialProfile";
import Timeline from "../components/Index/Timeline";
import LangProfile from "../components/Index/LangProfile";

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

const Index: FC<null> = () => {
   const learnMoreAnimations = useAnimation();

   const page1 = useRef(null);
   const scrollListener = () => {
      const page1Visible = isInViewport(page1.current);
      if (page1Visible) {
         learnMoreAnimations.start("visible");
      } else {
         learnMoreAnimations.start("hidden");
      }
   };

   const [stickyNavbar, toggleStickyNavbar] = useState(false);
   const stickyScrollListener = () => {
      toggleStickyNavbar(window.scrollY > 0);
   };

   useEffect(() => {
      document.addEventListener("scroll", scrollListener);

      document.addEventListener("scroll", stickyScrollListener);
   });

   const pics = 2;
   const imgs = carousel.imgs;

   const [[pic, picData], cyclePics] = useState([1, imgs[0]]);
   const cyclePicture = () => {
      const newPic = pic + 1 > pics ? 1 : pic + 1;
      cyclePics([newPic, imgs[newPic - 1]]);
   };

   return (
      <div className="bg-gray-900">
         <div ref={page1} className="h-screen flex flex-col justify-between">
            <Navbar page="Main" sticky={stickyNavbar} />
            <div className="grid grid-cols-2">
               <div className="flex flex-col items-start ml-14 mr-8 mt-28">
                  <div className="flex justify-start py-5">
                     <p className="text-white text-3xl text-center">
                        Hi there! My name is{" "}
                        <span className="font-medium bg-purple-500 rounded-lg px-3 py-1 ml-1">Duke Tran</span>{" "}
                     </p>
                     <Emoji
                        label="wave"
                        symbol={"👋🏼"}
                        className="text-3xl transition origin-bottom-right ease-in-out duration-300 hover:scale-110 hover:rotate-12 pl-4 cursor-default"
                     />
                  </div>
                  <div className="w-full flex flex-col text-gray-200 text-lg space-y-4">
                     <p>
                        I&#39;m currently a junior studying CS and finance at William & Mary. I&#39;m super interested
                        in exploring the intersection of technology and financial markets, hopefully through internships
                        and other learning opportunities. I&#39;m also passionate about coding and programming in
                        general, so feel free to take a look around the website and learn more about me!
                     </p>
                     <p className="mt-2">
                        Below are some of my socials. Feel free to check them out and connect with me there!
                     </p>
                     <div className="flex justify-center px-4 py-2">
                        {socials.list.map((social) => {
                           return <SocialProfile key={social.type} {...social} />;
                        })}
                     </div>
                  </div>
               </div>
               <div className="grow-0 overflow-hidden flex flex-col items-center mx-10 mt-24">
                  <AnimatePresence initial={false}>
                     <motion.div
                        key={pic}
                        initial={{ x: 100, opacity: 0, z: 10 }}
                        animate={{ x: 0, opacity: 1, z: 10 }}
                        exit={{ x: -100, opacity: 0, z: 0 }}
                        transition={{
                           x: { type: "spring", stiffness: 300, damping: 300 },
                           opacity: { duration: 0.7 }
                        }}
                        className="grow-0 overflow-hidden">
                        <div>
                           <Image
                              src={picData.pic}
                              alt={picData.alt}
                              className="absolute rounded-xl"
                              width={picData.width}
                              height={picData.height}
                              loading="lazy"
                           />
                        </div>
                     </motion.div>
                  </AnimatePresence>
                  <button className="bg-purple-500 text-white rounded-lg p-3" onClick={() => cyclePicture()}>
                     Switch
                  </button>
                  {/* <div className="flex text-3xl my-4">
                     <p className="text-white">I am a/an </p>
                     <Typewriter
                        options={{
                           strings: [
                              "Programmer",
                              "Developer",
                              "Investor",
                              "Aspiring Analyst",
                              "Problem Solver",
                              "Critical Thinker"
                           ],
                           autoStart: true,
                           loop: true,
                           pauseFor: 5000,
                           wrapperClassName: "font-medium border-b-2 border-blue-500 ml-2 mr-1",
                           cursorClassName: "text-purple-400 shadow-md shadow-purple-200/40 animate-pulse"
                        }}
                     />
                  </div> */}
               </div>
            </div>
            <AnimatePresence>
               <motion.div
                  key="learn_more"
                  className="mt-auto flex justify-center"
                  animate={learnMoreAnimations}
                  variants={learnMoreVariants}>
                  <Link to="page2" smooth={"easeOutCubic"} offset={25} duration={1000} className="flex justify-center">
                     <div className="flex flex-col justify-end items-center mt-4 transition duration-500 transform group hover:scale-110 cursor-pointer">
                        <p className=" text-white text-xl text-center opacity-100 mb-2">Learn more</p>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                           src="/svg/down_arrows.svg"
                           alt="down arrows"
                           width="28"
                           height="28"
                           className="py-4 -translate-y-1/4 group-hover:animate-bounce"
                        />
                     </div>
                  </Link>
               </motion.div>
            </AnimatePresence>
         </div>
         <div id="page2" className="grid grid-cols-2 pt-20 px-10">
            <div className="flex flex-col items-center">
               <div className="flex justify-center items-center">
                  <div className="flex items-start pt-10">
                     <Image src="/img/coding.jpg" alt="img1" width={450} height={350} className="rounded-xl" />
                  </div>
               </div>
               <div className="flex items-center mt-20">
                  <div className="px-12 rounded-xl">
                     <p className="text-lg text-white leading-snug">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                     </p>
                  </div>
               </div>
            </div>
            <div className="flex flex-col items-center">
               <div className="flex justify-end">
                  <div className="flex flex-col h-2/3 rounded-xl p-12 mt-16">
                     <p className="text-3xl pb-8">
                        <span className="text-gray-100 rounded-md font-semibold">About me</span>
                     </p>
                     <p className="text-lg text-white leading-snug">
                        Enim diam vulputate ut pharetra sit. Iaculis at erat pellentesque adipiscing commodo elit. Et
                        magnis dis parturient montes nascetur. Tincidunt eget nullam non nisi. Commodo quis imperdiet
                        massa tincidunt nunc pulvinar sapien. Volutpat ac tincidunt vitae semper quis lectus nulla at.
                        Varius vel pharetra vel turpis nunc eget.
                     </p>
                  </div>
               </div>
               <div className="flex justify-center">
                  <div>
                     <Image src="/img/outside.jpg" alt="img2" width={300} height={469} className="rounded-xl" />
                  </div>
               </div>
            </div>
         </div>
         <Timeline />
         <div className="mt-28">
            <div className="flex flex-col justify-center max-w-5xl px-10 mx-auto rounded-xl">
               <div className="flex flex-col rounded-xl">
                  <p className="text-2xl text-center pt-14 pb-8">
                     <span className="bg-gray-100 text-blue-600 px-3 py-1 rounded-md font-semibold">Technologies</span>
                  </p>
                  <p className="text-lg text-white px-10">
                     Enim diam vulputate ut pharetra sit. Iaculis at erat pellentesque adipiscing commodo elit. Et
                     magnis dis parturient montes nascetur. Tincidunt eget nullam non nisi. Commodo quis imperdiet massa
                     tincidunt nunc pulvinar sapien. Volutpat ac tincidunt vitae semper quis lectus nulla at. Varius vel
                     pharetra vel turpis nunc eget. Nulla facilisi etiam dignissim diam quis. Euismod lacinia at quis
                     risus sed vulputate odio ut enim. Vitae auctor eu augue ut lectus arcu bibendum at.
                  </p>
                  <div className="space-y-4 p-10">
                     <p className="text-2xl text-white py-1 rounded-md font-semibold">Experienced</p>
                     <div className="grid grid-cols-5 gap-x-4 xl:gap-x-10 w-full pb-4">
                        {languages.experienced.map((lang) => {
                           return <LangProfile key={lang.text} {...lang} />;
                        })}
                     </div>
                     <p className="text-2xl text-white pt-5 pb-1 rounded-md font-semibold">Learning</p>
                     <div className="grid grid-cols-5 gap-x-4 xl:gap-x-10 w-full">
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
                  <span className="text-2xl bg-gray-100  text-blue-600 px-3 py-1 rounded-md font-semibold">
                     Projects
                  </span>
               </p>
               <p className="text-lg text-white px-10 pb-10 max-w-screen-xl">
                  Enim diam vulputate ut pharetra sit. Iaculis at erat pellentesque adipiscing commodo elit. Et magnis
                  dis parturient montes nascetur. Tincidunt eget nullam non nisi. Commodo quis imperdiet massa tincidunt
                  nunc pulvinar sapien.
               </p>
               <div className="grid grid-cols-3 gap-14 max-w-screen-lg pb-20">
                  <div className="flex flex-col col-span-1 px-4 rounded-xl bg-gradient-to-tr from-blue-800 to-blue-700">
                     <div className="flex justify-center">
                        <p className="text-white text-2xl m-2 pb-1 border-b-2 border-white">Kickflip</p>
                     </div>
                     <div className="flex w-full justify-center p-5">
                        <Image src="/typescript.png" alt="img3" width={100} height={100} />
                     </div>
                  </div>
                  <div className="flex flex-col col-span-1 px-4 rounded-xl bg-gradient-to-tr from-blue-800 to-blue-700">
                     <div className="flex justify-center">
                        <p className="text-white text-2xl m-2 pb-1 border-b-2 border-white">Whispearrings</p>
                     </div>
                     <div className="flex w-full justify-center p-5">
                        <Image src="/typescript.png" alt="img4" width={100} height={100} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Index;
