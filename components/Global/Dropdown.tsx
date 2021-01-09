import DropdownItem from "./DropdownItem";

export interface DropdownProps {
   contents: Array<string>;
}

const Dropdown: React.FunctionComponent<DropdownProps> = ({ contents }) => {
   return (
      <div className="absolute grid grid-cols-3 bg-gray-700 rounded-lg top-20">
         {contents.map((text) => {
            return <DropdownItem key={text} text={text} />;
         })}
      </div>
   );
};

export default Dropdown;
