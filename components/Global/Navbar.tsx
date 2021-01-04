import Navlink from "./Navlink";

export interface Props {}

const links: Array<string> = ["Resume", "Projects", "Contact"];

const Navbar: React.FunctionComponent<Props> = () => {
   return (
      <div className="bg-gray-900">
         <div className="flex justify-between">
            <div className="border-b-4 mx-5 py-5">
               <a href="" className="text-4xl text-white mx-5">
                  Duke Tran
               </a>
            </div>
            <div className="flex justify-between px-5">
               {links.map((link, idx) => {
                  return <Navlink key={idx} text={link} />;
               })}
            </div>
         </div>
      </div>
   );
};

export default Navbar;
