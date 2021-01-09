export interface DropdownItemProps {
   text: string;
}

const DropdownItem: React.FunctionComponent<DropdownItemProps> = ({ text }) => {
   return (
      <button className="flex justify-center bg-purple-600 m-5 rounded-md">
         <p className="text-gray-100 px-4 py-2">{text}</p>
      </button>
   );
};

export default DropdownItem;
