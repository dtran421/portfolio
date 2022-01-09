import { useEffect, useRef } from "react";
import { useAnimation, AnimatePresence, motion } from "framer-motion";

import Navbar from "../components/Global/Navbar";
import StickyBar from "../components/Global/StickyBar";
import Section from "../components/Resume/Section";
import Subsection from "../components/Resume/Subsection";
import resumeContents from "../public/json/resume.json";
import { isInViewport } from "./index";

export interface ResumeProps {}

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

const Resume: React.FunctionComponent<ResumeProps> = () => {
   const stickyAnimations = useAnimation();
   const profile = useRef(null);

   const scrollListener = () => {
      const profileVisible = isInViewport(profile.current);
      profileVisible ? stickyAnimations.start("hidden") : stickyAnimations.start("visible");
   };
   useEffect(() => {
      document.addEventListener("scroll", scrollListener);
   });

   return (
      <div>
         <Navbar page="Resume" sticky={false} />
         <div className="flex justify-center bg-gradient-to-tr from-blue-800 to-blue-700">
            <p className="text-6xl my-20">Duke Tran</p>
         </div>
         <div ref={profile} className="max-w-screen-xl mx-auto">
            <Section heading="Profile">
               <p className="text-2xl px-20">
                  Studying computer science and finance at William & Mary. Accumulated profound research and programming
                  skills through classroom experiences. Working as an online tutor gaining invaluable technology and
                  teaching experience. Employed at Agency 1693 as marketing staff member, collaborating on marketing
                  projects.
               </p>
            </Section>
         </div>
         {/*<AnimatePresence>
            <motion.div key="sticky_nav" initial="hidden" animate={stickyAnimations} variants={stickyVariants}>
               <StickyBar title="Resume" />
            </motion.div>
         </AnimatePresence>*/}
         <div className="max-w-screen-xl mx-auto pb-20">
            <Section heading="Experience">
               {resumeContents["Experience"].map((content, idx, arr) => {
                  return <Subsection key={idx} content={content} idx={idx} max={arr.length} />;
               })}
            </Section>
            <Section heading="Education">
               {resumeContents["Education"].map((content, idx, arr) => {
                  return <Subsection key={idx} content={content} idx={idx} max={arr.length} />;
               })}
            </Section>
            <div className="grid grid-cols-2 gap-14">
               <Section heading="Professional Skills">
                  <div className="flex flex-wrap justify-center max-w-screen-lg mx-auto">
                     {resumeContents["Skills"].map((content, idx) => {
                        return (
                           <div key={idx} className="m-4">
                              <p className="rounded-full bg-blue-700 text-white text-2xl inline py-1 px-4">{content}</p>
                           </div>
                        );
                     })}
                  </div>
               </Section>
               <Section heading="Certifications">
                  <div className="flex flex-wrap justify-center max-w-screen-lg mx-auto">
                     {resumeContents["Certifications"].map((content, idx) => {
                        return (
                           <div key={idx} className="m-4">
                              <p className="rounded-full bg-blue-700 text-white text-2xl inline py-1 px-4">{content}</p>
                           </div>
                        );
                     })}
                  </div>
               </Section>
               <Section heading="Accomplishments">
                  <div className="flex flex-wrap justify-center max-w-screen-lg mx-auto">
                     {resumeContents["Accomplishments"].map((content, idx) => {
                        return (
                           <div key={idx} className="m-4 px-8">
                              <p className="rounded-full bg-blue-700 text-white text-2xl inline-block text-center py-1 px-4">
                                 {content}
                              </p>
                           </div>
                        );
                     })}
                  </div>
               </Section>
               <Section heading="Languages">
                  <div className="flex flex-wrap justify-center max-w-screen-lg mx-auto">
                     {resumeContents["Languages"].map((content, idx) => {
                        return (
                           <div key={idx} className="m-4">
                              <p className="rounded-full bg-blue-700 text-white text-2xl inline py-1 px-4">{content}</p>
                           </div>
                        );
                     })}
                  </div>
               </Section>
            </div>
         </div>
      </div>
   );
};

export default Resume;
