import { useState } from "react";
import Switch from "react-switch";
import "react-toggle/style.css";

import Navlink from "./Navlink";
import dropdownContents from "../../public/dropdown.json";

export interface NavbarProps {
   page: string;
}

const Navbar: React.FunctionComponent<NavbarProps> = ({ page }) => {
   const [dropdownTab, setTab] = useState("");
   const [dropdownVisibility, setDropdownVisibility] = useState(false);
   const toggleDropdown = (status, tab) => {
      setDropdownVisibility(status);
      setTab(tab);
   };

   return (
      <div className="bg-gray-900" onMouseLeave={() => toggleDropdown(false, "")}>
         <div className="flex justify-between">
            <div className="flex">
               <div className="flex">
                  <div className={`${page === "Main" && "border-b-4"} mx-5 py-5`}>
                     <a
                        href="/"
                        className={`text-4xl ${
                           page === "Main" ? "text-white" : "text-blue-500"
                        } mx-5 hover:text-purple-200`}>
                        Duke Tran
                     </a>
                  </div>
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
            <div className="flex items-center mx-10">
               <div>
                  <Switch
                     aria-label="night mode toggle"
                     checked={true}
                     onChange={() => console.log("test")}
                     checkedIcon={<img src="/moon.svg" />}
                     uncheckedIcon={<img src="/sun.svg" />}
                     onColor={"#6942C4"}
                     offColor={"#3C76DA"}
                     onHandleColor={"#C3CBCF"}
                     handleDiameter={32}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Navbar;
