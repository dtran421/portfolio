import { RefObject } from "react";

import MobileImage from "./MobileImage";

type ParagraphProps = {
  pRefs: RefObject<HTMLParagraphElement>[];
  page: string;
  idx: number;
  paragraph: {
    heading: string;
    body: string;
  };
};

const Paragraph = ({ pRefs, page, idx, paragraph: { heading, body } }: ParagraphProps) => (
  <div
    id={`paragraph${idx + 1}`}
    className="space-y-6 first:pt-0 pt-20 lg:pt-40 pb-20 lg:pb-40 last:pb-10 lg:last:pb-40"
  >
    <h2 className="text-3xl font-semibold">{heading}</h2>
    <p ref={pRefs[idx]} className="text-xl leading-relaxed">
      {body}
    </p>
    <MobileImage {...{ page, idx }} />
  </div>
);

export default Paragraph;
