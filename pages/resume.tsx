import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import Link from "next/link";
import { FiCheck, FiMail, FiPhone, FiHome } from "react-icons/fi";

import { lgScreenQuery } from "../components/Global/configs/Breakpoints";

import MainLayout from "../components/Global/layouts/MainLayout";
import Section from "../components/Resume/Section";
import resumeContents from "../public/json/resume.json";

const Resume: FC<null> = () => {
   const lgScreen = useMediaQuery(lgScreenQuery);

   const iconProps = {
      size: lgScreen ? 18 : 12,
      className: "dark:text-white"
   };

   return (
      <MainLayout page="Resume">
         <div className="mt-16">
            <div className="md:max-w-2xl lg:max-w-4xl xl:max-w-6xl h-48 lg:h-64 mx-auto">
               <div
                  className="h-full overflow-hidden bg-no-repeat bg-auto lg:bg-cover bg-center "
                  style={{ backgroundImage: "url(/img/city_night.jpg)" }}
               />
               <div className="relative w-full h-full flex justify-center lg:justify-start px-10">
                  <div className="absolute bottom-32 lg:bottom-48 overflow-hidden w-48 h-48 lg:w-56 lg:h-56 border-8 border-slate-100 dark:border-zinc-900 dark-transition rounded-full">
                     <Image
                        alt="headshot"
                        src="/img/profile.jpeg"
                        width={1080}
                        height={1616}
                        className="-translate-y-14 brightness-110"
                     />
                  </div>
               </div>
            </div>
            <div className="w-3/4 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl flex flex-col items-start space-y-2 mx-auto mt-16 lg:mt-20">
               <div className="flex items-center space-x-2 lg:space-x-4">
                  <h1 className="text-2xl lg:text-3xl dark:text-white font-bold">Duke Tran</h1>
                  <div className="bg-secondary rounded-full p-1">
                     <FiCheck size={lgScreen ? 18 : 14} />
                  </div>
               </div>
               <div className="flex flex-col md:flex-row justify-between text-lg text-zinc-800 dark:text-zinc-200 dark-transition">
                  <div className="flex flex-col justify-between space-y-4 lg:space-y-6 mb-10 lg:mb-0">
                     <h2 className="md:w-5/6 lg:w-2/3 font-medium text-sm lg:text-lg">
                        Incoming EY FSO Technology Consulting Intern | Chief Financial Officer of Agency 1693 | CS +
                        Finance @ William & Mary
                     </h2>
                     <Link href="/contact" passHref={true}>
                        <button className="w-full md:w-min bg-primary text-lg lg:text-xl text-white dark:text-zinc-200 dark-transition font-semibold rounded-full px-8 py-1 lg:py-2">
                           Contact
                        </button>
                     </Link>
                  </div>
                  <div className="lg:w-5/12 space-y-2">
                     <ContactLabel label="duketran2001@gmail.com" center={true}>
                        <FiMail {...iconProps} />
                     </ContactLabel>
                     <ContactLabel label="(703)-409-3681" center={true}>
                        <FiPhone {...iconProps} />
                     </ContactLabel>
                     <ContactLabel
                        label="Please contact me personally if you need my address"
                        center={false}
                        special={true}>
                        <FiHome {...iconProps} />
                     </ContactLabel>
                  </div>
               </div>
            </div>
            <div className="w-3/4 md:max-w-xl lg:max-w-3xl xl:max-w-5xl space-y-20 mx-auto mt-10 lg:mt-20">
               {resumeContents["Tabs"].map(({ heading, body }, sectionIdx) => {
                  return <Section key={sectionIdx} type="Tabs" {...{ heading, body }} />;
               })}
               {resumeContents["Bubbles"].map(({ heading, body }, sectionIdx) => {
                  return <Section key={sectionIdx} type="Bubbles" {...{ heading, body }} />;
               })}
            </div>
         </div>
      </MainLayout>
   );
};

interface ContactLabelProps {
   label: string;
   center: boolean;
   special?: boolean;
}

const ContactLabel: FC<ContactLabelProps> = ({ label, center, special, children }) => {
   return (
      <div className={`flex ${center ? "items-center" : "items-start"} space-x-2`}>
         <span className="bg-zinc-200/75 dark:bg-zinc-700/75 rounded-full p-2">{children}</span>
         <p className={`text-sm lg:text-lg ${special ? "italic" : ""}`}>{label}</p>
      </div>
   );
};

export default Resume;
