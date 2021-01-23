interface Subsection {
   title: string;
   organization: string;
   date: string;
   description: string;
}

export interface SubsectionProps {
   content: Subsection;
   idx: number;
   max: number;
}

const Subsection: React.FunctionComponent<SubsectionProps> = ({ content, idx, max }) => {
   let style;
   if (idx === 0) style = "pb-10 border-b-4 border-gray-600";
   else if (idx + 1 === max) style = "pt-10";
   else style = "py-10 border-b-4 border-gray-600";
   return (
      <div className={`mx-20 ${style}`}>
         <div className="flex justify-between pb-8 items-end">
            <div className="flex flex-col">
               <p className="text-3xl font-semibold text-blue-500">{content.title}</p>
               <p className="text-2xl text-gray-400">{content.organization}</p>
            </div>
            <div>
               <p className="text-2xl text-gray-400">{content.date}</p>
            </div>
         </div>
         <p className="flex text-2xl">{content.description}</p>
      </div>
   );
};

export default Subsection;
