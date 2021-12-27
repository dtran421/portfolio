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
      <div
         className={`items-center ${active && "border-b-4"} mx-5 py-3 cursor-pointer`}
         onMouseEnter={() => toggleDropdown(true, link)}>
         <a
            href={`/${link.toLowerCase()}`}
            className={`text-xl ${active ? "text-white" : "text-blue-500"} hover:text-purple-200 mx-5`}>
            {link}
         </a>
         {dropdownVisibility && dropdownTab === link && <Dropdown page={link.toLowerCase()} contents={contents} />}
      </div>
   );
};

export default Navlink;
