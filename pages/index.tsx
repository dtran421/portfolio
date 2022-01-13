import { useState, useEffect, useRef, FC } from "react";
import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Link } from "react-scroll";
import Typewriter from "typewriter-effect";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { FaGithub, FaLinkedinIn, FaFacebookF, FaTwitter } from "react-icons/fa";
import { FiChevronsDown } from "react-icons/fi";

import { lgScreenQuery, xlScreenQuery } from "../components/Global/configs/Breakpoints";
import carousel from "../public/json/carousel.json";

import Emoji from "../components/Global/Emoji";
import SocialProfile from "../components/Index/SocialProfile";
import Timeline from "../components/Index/Timeline";
import LangGroup from "../components/Index/LangGroup";
import MainLayout from "../components/Global/layouts/MainLayout";

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
   const lgScreen = useMediaQuery(lgScreenQuery);
   const xlScreen = useMediaQuery(xlScreenQuery);
   const learnMoreAnimations = useAnimation();

   const page1 = useRef(null);
   const scrollListener = () => {
      if (page1.current) {
         const page1Visible = isInViewport(page1.current);
         if (page1Visible) {
            learnMoreAnimations.start("visible");
         } else {
            learnMoreAnimations.start("hidden");
         }
      }
   };

   const pics = 2;
   const imgs = carousel.imgs;

   const [[pic, picData, init], cyclePics] = useState([1, imgs[0], true]);
   const typewriter = useRef(null);
   const typewriterListener = () => {
      const cyclePicture = () => {
         const loop = pic + 1 > pics;
         const newPic = loop ? 1 : pic + 1;
         cyclePics([newPic, imgs[newPic - 1], loop]);
      };

      let typewriterText = typewriter.current.children[0].innerText;

      if (typewriterText.length == 1) {
         if (init) {
            cyclePics([pic, picData, false]);
         } else {
            cyclePicture();
         }
      }
   };

   useEffect(() => {
      document.addEventListener("scroll", scrollListener);

      let typewriterNode;
      if (typewriter.current) {
         typewriterNode = typewriter.current;
         typewriter.current.addEventListener("DOMSubtreeModified", typewriterListener);
      }

      return () => {
         document.removeEventListener("scroll", scrollListener);

         typewriterNode.removeEventListener("DOMSubtreeModified", typewriterListener);
      };
   });

   const socialIconClass = "z-10 flex justify-center items-center text-white bg-primary rounded-full p-2";
   const socialIconProps = {
      size: lgScreen ? 24 : 20
   };

   return (
      <MainLayout page="Portfolio">
         <div ref={page1} className="w-5/6 xl:h-screen flex flex-col justify-between items-center mx-auto">
            <div className="flex flex-col lg:flex-row justify-center lg:space-x-8 space-y-14 lg:space-y-0 mt-20 lg:mt-24 xl:mt-40">
               <div className="w-full lg:w-1/2 flex flex-col justify-start items-start mx-4">
                  <div className="flex justify-start py-5 text-2xl lg:text-3xl text-center">
                     <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row items-start md:items-center lg:items-start xl:items-center space-y-2 md:space-y-0 lg:space-y-2 xl:space-y-0">
                        <p className="inline dark:text-white dark-transition">Hi there! My name is </p>
                        <p className="inline">
                           <span className="font-medium text-white bg-gradient-to-tr from-primary to-secondary rounded-lg px-3 py-1 md:ml-3 lg:ml-0 xl:ml-3">
                              Duke Tran
                           </span>
                           <Emoji
                              label="wave"
                              symbol={"👋🏼"}
                              className="text-3xl transition origin-bottom-right ease-in-out duration-300 hover:scale-110 hover:rotate-12 ml-3 cursor-default"
                           />
                        </p>
                     </div>
                     {/* <AnimatePresence>
                        <motion.div
                           animate={{ rotate: [10, 100, 10, 100, 10, 100, 10, 0] }}
                           transition={{
                              repeat: Infinity,
                              repeatType: "loop",
                              duration: 2,
                              times: [0.4, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.4],
                              repeatDelay: 1
                           }}>
                           <Emoji
                              label="wave"
                              symbol={"👋🏼"}
                              className="text-3xl transition origin-bottom-right ease-in-out duration-300 hover:scale-110 hover:rotate-12 ml-4 cursor-default"
                           />
                        </motion.div>
                     </AnimatePresence> */}
                  </div>
                  <div className="w-full flex flex-col text-gray-800 dark:text-gray-200 lg:text-lg space-y-4">
                     <p>
                        I&#39;m currently a junior studying CS and finance at William & Mary. I&#39;m super interested
                        in exploring the intersection of technology and financial markets, hopefully through internships
                        and other learning opportunities. I&#39;m also passionate about coding and programming in
                        general, so feel free to take a look around the website and learn more about me!
                     </p>
                     <p className="mt-2">
                        Below are some of my socials. Feel free to check them out and connect with me there!
                     </p>
                     <div className="w-full flex justify-center md:px-4 lg:px-0">
                        <div className="w-full lg:w-2/3 xl:w-full grid grid-cols-2 xl:flex xl:justify-center gap-x-8 lg:gap-x-4 xl:gap-x-2 gap-y-4">
                           <SocialProfile type="Github" name="dtran421" link="https://github.com/dtran421">
                              <div className={socialIconClass}>
                                 <FaGithub {...socialIconProps} />
                              </div>
                           </SocialProfile>
                           <SocialProfile type="LinkedIn" name="duketran" link="https://www.linkedin.com/in/duketran/">
                              <div className={socialIconClass}>
                                 <FaLinkedinIn {...socialIconProps} />
                              </div>
                           </SocialProfile>
                           <SocialProfile type="Facebook" name="dtran421" link="https://www.facebook.com/dtran421">
                              <div className={socialIconClass}>
                                 <FaFacebookF {...socialIconProps} />
                              </div>
                           </SocialProfile>
                           <SocialProfile type="Twitter" name="dtran421" link="https://www.twitter.com/dtran421">
                              <div className={socialIconClass}>
                                 <FaTwitter {...socialIconProps} />
                              </div>
                           </SocialProfile>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="md:w-full lg:w-1/2 relative overflow-hidden flex flex-col justify-start items-center space-y-4 mx-8">
                  {lgScreen && (
                     <div className="w-full h-full lg:h-5/6 xl:h-1/2 flex justify-center items-center xl:items-start">
                        <AnimatePresence initial={false}>
                           <motion.img
                              key={pic}
                              alt={picData.alt}
                              src={picData.pic}
                              initial={{ x: 200, opacity: 0 }}
                              animate={{ x: 0, opacity: 1, zIndex: 1 }}
                              exit={{ x: -200, opacity: 0, zIndex: 0 }}
                              transition={{
                                 zIndex: { duration: 0.1 },
                                 x: {
                                    duration: 1.5,
                                    ease: "easeInOut"
                                 },
                                 opacity: {
                                    duration: 2,
                                    ease: "easeOut"
                                 }
                              }}
                              width={picData.width}
                              height={picData.height}
                              className="absolute rounded-xl"
                           />
                        </AnimatePresence>
                     </div>
                  )}
                  <div className="w-full flex justify-center text-3xl dark:text-white dark-transition">
                     <p className="inline-block">I am </p>
                     <div ref={typewriter}>
                        <Typewriter
                           options={{
                              strings: [
                                 "a Programmer",
                                 "a Developer",
                                 "an Investor",
                                 "an Analyst",
                                 "a Problem Solver",
                                 "a Critical Thinker"
                              ],
                              autoStart: true,
                              loop: true,
                              pauseFor: 5000,
                              wrapperClassName: "font-medium border-b-2 border-secondary ml-2 mr-1",
                              cursorClassName: "text-primary shadow-md shadow-red-200/40 animate-pulse"
                           }}
                        />
                     </div>
                  </div>
               </div>
            </div>
            {lgScreen && (
               <AnimatePresence>
                  <motion.div
                     key="learn_more"
                     className="mt-auto flex justify-center"
                     animate={learnMoreAnimations}
                     variants={learnMoreVariants}>
                     <Link
                        to="page2"
                        smooth={"easeOutCubic"}
                        offset={25}
                        duration={1000}
                        className="flex justify-center">
                        <div className="flex flex-col justify-end items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 mt-4 transition duration-500 group hover:scale-110 cursor-pointer">
                           <p className="text-xl text-center opacity-100 mb-1">Learn more</p>
                           <div className="-translate-y-1/4 transition duration-200 opacity-60 group-hover:opacity-100 group-hover:animate-bounce py-4">
                              <FiChevronsDown size={24} />
                           </div>
                        </div>
                     </Link>
                  </motion.div>
               </AnimatePresence>
            )}
         </div>
         <div id="page2" className="flex flex-col items-center px-10 py-20 mb-10">
            {lgScreen ? (
               <ParallaxProvider>
                  <div className="flex justify-center space-x-10 py-10">
                     <Parallax y={xlScreen ? ["-20%", "20%"] : ["-10%", "10%"]}>
                        <Image src="/img/coding.jpg" alt="img1" width={450} height={350} className="rounded-xl" />
                     </Parallax>
                     <div className="w-1/2 flex flex-col rounded-xl">
                        <Parallax y={xlScreen ? ["150%", "-30%"] : ["75%", "-20%"]}>
                           <h1 className="text-3xl dark:text-white dark-transition rounded-md font-semibold mb-8">
                              About Me
                           </h1>
                           <p className="text-lg text-gray-800 dark:text-gray-200 dark-transition leading-snug">
                              Enim diam vulputate ut pharetra sit. Iaculis at erat pellentesque adipiscing commodo elit.
                              Et magnis dis parturient montes nascetur. Tincidunt eget nullam non nisi. Commodo quis
                              imperdiet massa tincidunt nunc pulvinar sapien. Volutpat ac tincidunt vitae semper quis
                              lectus nulla at. Varius vel pharetra vel turpis nunc eget.
                           </p>
                        </Parallax>
                     </div>
                  </div>
                  <div className="flex justify-center space-x-10 py-10">
                     <div className="w-1/2 rounded-xl">
                        <Parallax y={["75%", "175%"]}>
                           <p className="text-lg text-gray-800 dark:text-gray-200 dark-transition leading-snug">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                              ullamco laboris nisi ut aliquip ex ea commodo consequat.
                           </p>
                        </Parallax>
                     </div>
                     <Parallax y={["25%", "-10%"]}>
                        <Image
                           src="/img/outside.jpg"
                           alt="img2"
                           width={300}
                           height={469}
                           layout="fixed"
                           className="rounded-xl"
                        />
                     </Parallax>
                  </div>
               </ParallaxProvider>
            ) : (
               <div className="max-w-xl mx-auto">
                  <div className="flex flex-col lg:flex-row items-center space-y-10 lg:space-x-10 py-10">
                     <Image src="/img/coding.jpg" alt="img1" width={450} height={350} className="rounded-xl" />
                     <div className="flex flex-col lg:flex-row rounded-xl">
                        <h1 className="text-2xl lg:text-3xl dark:text-white dark-transition rounded-md font-semibold mb-4 lg:mb-8">
                           About Me
                        </h1>
                        <p className="lg:text-lg text-gray-800 dark:text-gray-200 dark-transition leading-snug">
                           Enim diam vulputate ut pharetra sit. Iaculis at erat pellentesque adipiscing commodo elit. Et
                           magnis dis parturient montes nascetur. Tincidunt eget nullam non nisi. Commodo quis imperdiet
                           massa tincidunt nunc pulvinar sapien. Volutpat ac tincidunt vitae semper quis lectus nulla
                           at. Varius vel pharetra vel turpis nunc eget.
                        </p>
                     </div>
                  </div>
                  <div className="flex flex-col-reverse lg:flex-row justify-center lg:space-x-10 py-10">
                     <p className="lg:text-lg text-gray-800 dark:text-gray-200 dark-transition leading-snug mt-10 lg:mt-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                     </p>
                     <Image src="/img/outside.jpg" alt="img2" width={300} height={469} className="rounded-xl" />
                  </div>
               </div>
            )}
         </div>
         <div className="max-w-4xl px-4 lg:px-0 mx-auto">
            <h1 className="text-2xl lg:text-3xl dark:text-white dark-transition text-center font-semibold mb-8">
               My Journey
            </h1>
            <div className="mb-20">
               <Timeline />
            </div>
         </div>
         <div className="max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl flex flex-col justify-center px-6 mx-auto mt-32 rounded-xl">
            <h1 className="text-2xl lg:text-3xl text-center dark:text-white dark-transition font-semibold mb-4">
               Technologies
            </h1>
            <p className="lg:text-lg text-gray-800 dark:text-gray-200 dark-transition pb-6">
               As the digital world evolves, technologies and frameworks are constantly being developed and pushed to
               the forefront of our ever-advancing society. As a developer, it is my lifelong mission and ambition to
               stay on top of these incredible innovations and strive for mastery of these powerful tools that will
               enable me to explore my passions and perform my career functions to the best of my ability.
            </p>
            <div className="space-y-4">
               <LangGroup
                  name={"Experienced"}
                  desc={
                     "Numerous years of experience, intermediate to advanced mastery of associated concepts, thousands of lines coded"
                  }
                  emoji={"⚡️"}
                  emojiLabel="lightning"
               />
               <LangGroup
                  name={"Learning"}
                  desc={
                     "Limited years of experience, novice understanding of associated concepts, less than a thousand lines coded"
                  }
                  emoji={"📚"}
                  emojiLabel="books"
               />
               <LangGroup
                  name={"Future"}
                  desc={
                     "No experience, desire to learn relevant concepts and attain mastery, limited lines coded (or none)"
                  }
                  emoji={"📌"}
                  emojiLabel="pin"
               />
            </div>
         </div>
      </MainLayout>
   );
};

export default Index;
