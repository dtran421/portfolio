import DropdownItem from "./DropdownItem";

export interface DropdownProps {
   page: string;
   contents: Array<string>;
}

const Dropdown: React.FunctionComponent<DropdownProps> = ({ page, contents }) => {
   return (
      <div className="absolute grid grid-cols-3 gap-6 p-8 bg-gray-700 rounded-lg top-20">
         {contents.map((text) => {
            return <DropdownItem key={text} page={page} text={text} />;
         })}
      </div>
   );
};

export default Dropdown;
