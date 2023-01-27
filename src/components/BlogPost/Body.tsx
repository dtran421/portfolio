import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

import renderOptions from "../../lib/renderOptions";
import { Links } from "../../lib/types";

type BodyProps = {
    document: Document;
    links: Links;
};

const Body = ({ document, links }: BodyProps) => (
    <div className="space-y-4">
        {documentToReactComponents(document, renderOptions(links))}
    </div>
);

export default Body;
