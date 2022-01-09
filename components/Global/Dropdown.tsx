import DropdownItem from "./DropdownItem";

export interface DropdownProps {
   page: string;
   contents: Array<string>;
}

const Dropdown: React.FunctionComponent<DropdownProps> = ({ page, contents }) => {
   return (
      <div className="absolute grid grid-cols-3 gap-4 p-4 bg-gray-700 rounded-lg top-14">
         {contents.map((text) => {
            return <DropdownItem key={text} page={page} text={text} />;
         })}
      </div>
   );
};

export default Dropdown;
