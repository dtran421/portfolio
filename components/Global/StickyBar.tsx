import { animateScroll as scroll } from "react-scroll";

export interface StickyBarProps {
   title: string;
}

const StickyBar: React.FunctionComponent<StickyBarProps> = ({ title }) => {
   return (
      <div className="fixed top-0 z-10 flex justify-between bg-gray-200 w-full transition-opacity duration-1000 ease-linear px-4 py-2">
         <p className="text-purple-600 text-2xl font-extrabold">{title}</p>
         <div className="flex items-center cursor-pointer">
            <a className="flex text-xl font-semibold" onClick={() => scroll.scrollToTop()}>
               Back to top
               <img src="/up_arrow.svg" className="pl-2" />
            </a>
         </div>
      </div>
   );
};

export default StickyBar;
