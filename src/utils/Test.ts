import { BLOCKS, TopLevelBlock } from "@contentful/rich-text-types";

import { ResumeSubsection, RichText } from "./types";

export const generateRichTextStub = (text?: string): RichText => ({
  json: {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: [
      {
        nodeType: BLOCKS.PARAGRAPH,
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

export const generateSubsectionStub = (
  title?: string,
  text?: string
): {
  description: TopLevelBlock[];
} & Omit<ResumeSubsection, "description" | "currentlyWorking"> => ({
  title: title || "Software Engineer",
  organization: "Arch",
  startDate: "2021-01-01",
  endDate: "2021-01-01",
  description: generateRichTextStub(text).json.content,
});
