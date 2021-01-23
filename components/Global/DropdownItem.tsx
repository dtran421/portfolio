export interface DropdownItemProps {
   page: string;
   text: string;
}

const DropdownItem: React.FunctionComponent<DropdownItemProps> = ({ page, text }) => {
   return (
      <button className="flex justify-center bg-purple-600 rounded-md">
         <a href={`/${page}#${text.toLowerCase()}`} className="text-gray-100 px-4 py-2">
            {text}
         </a>
      </button>
   );
};

export default DropdownItem;
