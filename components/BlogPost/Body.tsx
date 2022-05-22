import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { useMediaQuery } from "react-responsive";
import { lgScreenQuery } from "../../configs/Breakpoints";

import renderOptions from "../../lib/renderOptions";
import { Links } from "../../types";

type BodyProps = {
    document: Document;
    links: Links;
};

const Body = ({ document, links }: BodyProps) => {
    const lgScreen = useMediaQuery(lgScreenQuery);

    return (
        <div className="space-y-4">
            {documentToReactComponents(
                document,
                renderOptions(links, lgScreen)
            )}
        </div>
    );
};

export default Body;
