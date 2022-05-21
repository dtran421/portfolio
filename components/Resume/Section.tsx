import dynamic from "next/dynamic";

import { SubsectionObject } from "../../types";

const Subsection = dynamic(() => import("./Subsection"), { ssr: false });

type SectionProps = {
    type: string;
    heading: string;
    body: (SubsectionObject | string)[];
};

const Section = ({ type, heading, body }: SectionProps) => (
    <div className="flex flex-col bg-zinc-300/25 dark:bg-zinc-700/50 dark-transition rounded-xl px-6 lg:px-10 py-6">
        <p
            className={`text-2xl lg:text-3xl text-center dark-transition font-semibold px-3 py-1 ${
                type === "Tabs" ? "mb-6" : "mb-4"
            }`}
        >
            {heading}
        </p>
        {type === "Tabs" ? (
            body.map((content: SubsectionObject, idx, arr) => {
                let style;
                if (idx === 0)
                    style =
                        "border-b-4 border-zinc-300 dark:border-zinc-600 dark-transition pb-6";
                else if (idx + 1 === arr.length) style = "pt-6";
                else
                    style =
                        "border-b-4 border-zinc-300 dark:border-zinc-600 dark-transition py-6";
                return (
                    <Subsection key={content.title} {...{ content, style }} />
                );
            })
        ) : (
            <div className="flex flex-wrap justify-center">
                {body.map((content, idx) => (
                    <p
                        // eslint-disable-next-line react/no-array-index-key
                        key={idx}
                        className="bg-secondary text-white text-center rounded-full lg:text-lg px-6 lg:px-3 py-1 mx-2 my-1"
                    >
                        {content}
                    </p>
                ))}
            </div>
        )}
    </div>
);

export default Section;
