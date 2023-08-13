import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

import renderOptions from "@/utils/renderOptions";
import { Links } from "@/utils/types";

type BodyProps = {
  document: Document | undefined;
  links: Links | undefined;
};

const Body = ({ document, links }: BodyProps) =>
  document && <div className="space-y-4">{documentToReactComponents(document, renderOptions(links))}</div>;

export default Body;
