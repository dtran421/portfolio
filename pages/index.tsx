import Navbar from "../components/Global/Navbar";
import Socials from "../components/Index/Socials";

export interface Props {}

const Index: React.FunctionComponent<Props> = () => {
   return (
      <div className="flex flex-col">
         <div className="relative h-screen">
            <Navbar />
            <div className="bg-blue-800 flex flex-col justify-center">
               <div className="py-20">
                  <p className="text-white text-5xl text-center py-5">
                     Hi! My name is{" "}
                     <span className="bg-gray-100 text-purple-600 px-3 rounded-md font-bold">Duke Tran!</span>
                  </p>
                  <div className="grid grid-cols-3 py-5">
                     <div></div>
                     <p className="text-white text-2xl text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                     </p>
                     <div></div>
                  </div>
               </div>
            </div>
            <Socials />
            <div className="absolute bottom-0 w-full flex flex-col bg-opacity-0 hover:bg-opacity-100 bg-gradient-to-t from-gray-600 to-transparent justify-center">
               <p className="text-white text-4xl text-center opacity-100 py-5">Learn more</p>
               <img src="/down_arrows.svg" className="py-4" />
            </div>
         </div>
      </div>
   );
};

export default Index;
