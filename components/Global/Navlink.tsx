import Dropdown from "./Dropdown";

export interface NavlinkProps {
   active: boolean;
   link: string;
   contents: Array<string>;
   toggleDropdown: (status: boolean, tab: string) => void;
   dropdownVisibility: boolean;
   dropdownTab: string;
}

const Navlink: React.FunctionComponent<NavlinkProps> = ({
   active,
   link,
   contents,
   toggleDropdown,
   dropdownVisibility,
   dropdownTab
}) => {
   return (
      <div>
         <div
            className={`border-b-4 border-b-transparent ${
               active
                  ? "border-opacity-100"
                  : "transition duration-200 ease-linear hover:border-blue-500/100 hover:cursor-pointer"
            } mx-5 py-3`}
            onMouseEnter={() => toggleDropdown(true, link)}>
            <a href={`/${link.toLowerCase()}`} className={`text-xl ${active ? "text-white" : "text-blue-500"} mx-5`}>
               {link}
            </a>
         </div>
         {/*dropdownVisibility && dropdownTab === link && <Dropdown page={link.toLowerCase()} contents={contents} />*/}
      </div>
   );
};

export default Navlink;
