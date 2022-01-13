import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { FiMail, FiPhone, FiBriefcase } from "react-icons/fi";

import { mdScreenQuery } from "../components/Global/configs/Breakpoints";

import MainLayout from "../components/Global/layouts/MainLayout";

const Contact: FC<null> = () => {
   const mdScreen = useMediaQuery(mdScreenQuery);

   const iconProps = {
      size: mdScreen ? 14 : 12
   };

   return (
      <MainLayout page="Contact">
         <div className="lg:h-screen flex justify-center items-center mt-28">
            <div className="max-w-5xl flex flex-col lg:grid lg:grid-cols-2 space-y-10 lg:space-y-0 mx-auto">
               <div className="max-w-xl flex flex-col items-center bg-gray-200/75 dark:bg-gray-800/75 dark-transition rounded-xl space-y-2 md:space-y-4 p-6 mx-6 md:mx-auto">
                  <p className="w-full font-Oxygen text-4xl text-white bg-gradient-to-tr from-primary to-secondary font-bold px-2 py-1">
                     DT
                  </p>
                  <div className="m-3 lg:m-4">
                     <Image alt="casual" src="/img/casual.png" width={198} height={237} />
                  </div>
                  <h1 className="text-3xl font-semibold">Duke Tran</h1>
                  <div className="w-full grid grid-cols-2 md:flex md:flex-col md:items-start gap-x-4 md:gap-x-4 gap-y-2 md:space-y-2">
                     <IdLabel {...{ mdScreen }} heading="Date of Birth" body="April 21, 2001" />
                     <IdLabel {...{ mdScreen }} heading="Residency" body="Williamsburg, VA" />
                     <IdLabel {...{ mdScreen }} heading="Organization" body="College of William & Mary" />
                     <IdLabel {...{ mdScreen }} heading="Graduation" body="January 2023" />
                  </div>
               </div>
               <div className="w-full h-full flex justify-center items-center">
                  <div className="max-w-lg lg:w-full h-1/2 flex bg-gray-200/75 dark:bg-gray-800/75 dark-transition rounded-xl space-x-4 md:space-x-8 p-4 mx-4 md:mx-auto lg:mx-4">
                     <div className="flex justify-center items-center">
                        <div className="flex justify-center items-center w-24 h-24 md:w-32 md:h-32 bg-gradient-to-tr from-primary to-secondary rounded-full">
                           <div className="font-Oxygen text-white text-3xl md:text-5xl font-bold">DT</div>
                        </div>
                     </div>
                     <div className="flex flex-col justify-center space-y-4 md:space-y-6">
                        <div>
                           <h1 className="text-xl md:text-3xl font-semibold">Duke Tran</h1>
                           <h2 className="md:text-xl text-gray-700 dark:text-gray-300 dark-transition font-medium">
                              Chief Financial Officer of Agency 1693
                           </h2>
                        </div>
                        <div className="space-y-1 md:space-y-2">
                           <ContactLabel label="duketran2001@gmail.com">
                              <FiMail {...iconProps} />
                           </ContactLabel>
                           <ContactLabel label="dtran@email.wm.edu">
                              <FiBriefcase {...iconProps} />
                           </ContactLabel>
                           <ContactLabel label="(703)-409-3681">
                              <FiPhone {...iconProps} />
                           </ContactLabel>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </MainLayout>
   );
};

interface IdLabelProps {
   mdScreen: boolean;
   heading: string;
   body: string;
}

const IdLabel: FC<IdLabelProps> = ({ mdScreen, heading, body }) => {
   return mdScreen ? (
      <p className="space-x-1">
         <span className="font-medium text-gray-700 dark:text-gray-300 dark-transition">{heading}</span>:{" "}
         <span className="bg-gray-400/30 dark:bg-gray-600/30 dark-transition lg:text-lg rounded-lg px-2 py-1">
            {body}
         </span>
      </p>
   ) : (
      <div className="h-full flex flex-col justify-between items-center space-y-1">
         <p className="w-full h-1/3 flex justify-center items-center text-center font-medium text-gray-700 dark:text-gray-300 dark-transition">
            {heading}
         </p>
         <p className="w-full h-2/3 flex justify-center items-center text-sm lg:text-md text-center bg-gray-400/30 dark:bg-gray-600/30 dark-transition rounded-lg px-2 py-1">
            {body}
         </p>
      </div>
   );
};

interface ContactLabelProps {
   label: string;
   special?: boolean;
}

const ContactLabel: FC<ContactLabelProps> = ({ label, special, children }) => {
   return (
      <div className="flex items-center space-x-2">
         <span className="bg-gray-300/75 dark:bg-gray-700/75 dark-transition md:text-lg rounded-full p-2">
            {children}
         </span>
         <p className={`${special && "italic"}`}>{label}</p>
      </div>
   );
};

export default Contact;
