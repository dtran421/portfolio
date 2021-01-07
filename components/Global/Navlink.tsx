import { Dispatch, SetStateAction } from "react";

import Dropdown from "./Dropdown";

export interface NavlinkProps {
   text: string;
   contents: Array<string>;
   toggleDropdown: (status: boolean, tab: string) => void;
   dropdownVisibility: boolean;
   dropdownTab: string;
}

const Navlink: React.FunctionComponent<NavlinkProps> = ({
   text,
   contents,
   toggleDropdown,
   dropdownVisibility,
   dropdownTab
}) => {
   return (
      <div className="mx-10 py-5" onMouseEnter={(event) => toggleDropdown(true, text)}>
         <a href="" className="text-3xl text-blue-500 hover:text-purple-200">
            {text}
         </a>

         {dropdownVisibility && dropdownTab == text && <Dropdown contents={contents} />}
      </div>
   );
};

export default Navlink;
