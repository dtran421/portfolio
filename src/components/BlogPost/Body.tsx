import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

import useRichTextRenderOptions from "@/hooks/useRichTextRenderOptions";
import { Links } from "@/utils/types";

interface Props {
  document?: Document;
  links?: Links;
}

const Body = ({ document, links }: Props) => {
  const { renderOptions } = useRichTextRenderOptions(links);

  if (!document) {
    return "No content.";
  }

  return <div className="space-y-4">{documentToReactComponents(document, renderOptions)}</div>;
};

export default Body;
