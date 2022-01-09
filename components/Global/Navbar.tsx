import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

import Navlink from "./Navlink";
import dropdownContents from "../../public/json/dropdown.json";

export interface NavbarProps {
   page: string;
   sticky: boolean;
}

const Navbar: React.FunctionComponent<NavbarProps> = ({ page, sticky }) => {
   const [dropdownTab, setTab] = useState("");
   const [dropdownVisibility, setDropdownVisibility] = useState(false);
   const toggleDropdown = (status, tab) => {
      setDropdownVisibility(status);
      setTab(tab);
   };

   const pageTitle = `Duke Tran | ${page === "Main" ? "Portfolio" : page}`;

   return (
      <>
         <Head>
            <title>{pageTitle}</title>
            <meta property="og:title" content={pageTitle} key="title" />
         </Head>
         <div
            className={`fixed z-20 w-full bg-gray-900 transition-all duration-300 ease-in ${
               sticky ? "bg-opacity-90 backdrop-blur-md" : "bg-gray-900 pt-4"
            }`}
            onMouseLeave={() => toggleDropdown(false, "")}>
            <div className="flex items-center">
               <p className="font-Oxygen text-4xl text-white font-bold ml-6 mr-3">DT</p>
               <div
                  className={`${page === "Main" && "border-b-4"} py-3 mx-5`}
                  onMouseEnter={() => toggleDropdown(false, "")}>
                  <Link href="/">
                     <a
                        className={`text-xl ${
                           page === "Main" ? "text-white" : "text-blue-500 hover:text-purple-200"
                        } mx-5`}>
                        Portfolio
                     </a>
                  </Link>
               </div>
               <div className="flex justify-between pr-10">
                  {Object.keys(dropdownContents).map((link, idx) => {
                     return (
                        <Navlink
                           key={idx}
                           active={page === link}
                           link={link}
                           contents={dropdownContents[link]}
                           toggleDropdown={toggleDropdown}
                           dropdownVisibility={dropdownVisibility}
                           dropdownTab={dropdownTab}
                        />
                     );
                  })}
               </div>
            </div>
         </div>
      </>
   );
};

export default Navbar;
