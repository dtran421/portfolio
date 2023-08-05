import { BLOCKS } from "@contentful/rich-text-types";

import { RichText } from "../types";

export const generateRichTextStub = (text?: string): RichText => ({
  json: {
    nodeType: "document" as BLOCKS.DOCUMENT,
    data: {},
    content: [
      {
        nodeType: "paragraph" as BLOCKS.PARAGRAPH,
        data: {},
        content: [
          {
            nodeType: "text",
            value: text || "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            marks: [],
            data: {},
          },
        ],
      },
    ],
  },
});
