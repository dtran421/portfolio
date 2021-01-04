export interface Props {
   key: number;
   text: string;
}

const Navlink: React.FunctionComponent<Props> = ({ text }) => {
   return (
      <div className="mx-10 py-5">
         <a href="" className="text-3xl text-blue-500 hover:text-purple-200">
            {text}
         </a>
      </div>
   );
};

export default Navlink;
