import { ResumeSubsection } from "@/utils/types";

import Subsection from "./Subsection";

type SectionProps =
  | {
      heading: string;
    } & (
      | {
          type: "Tabs";
          body: ResumeSubsection[];
        }
      | {
          type: "Bubbles";
          body: string[];
        }
    );

const Section = ({ type, heading, body }: SectionProps) => (
  <div className="flex flex-col bg-zinc-300/25 dark:bg-zinc-700/50 dark-transition rounded-xl px-6 lg:px-10 py-6">
    <h3
      className={`text-2xl lg:text-3xl text-center dark:text-white dark-transition font-semibold px-3 py-1 ${
        type === "Tabs" ? "mb-6" : "mb-4"
      }`}
    >
      {heading}
    </h3>
    {type === "Tabs" ? (
      body.map((content, idx, arr) => {
        let pos: "first" | "middle" | "last";
        switch (idx) {
          case 0:
            pos = "first";
            break;
          case arr.length - 1:
            pos = "last";
            break;
          default:
            pos = "middle";
            break;
        }

        return (
          <Subsection
            key={content.title}
            title={content.title}
            organization={content.organization}
            startDate={content.startDate}
            endDate={content.endDate}
            currentlyWorking={content.currentlyWorking}
            description={content.description.json.content}
            pos={pos}
          />
        );
      })
    ) : (
      <div className="flex flex-wrap justify-center">
        {body.map((content) => (
          <p
            key={content}
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
