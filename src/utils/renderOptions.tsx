import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

import { CodeSnippetBlock, Links } from "./types";

const renderOptions = (links: Links | undefined): Options => {
  // create an entry map
  const entryBlockMap = new Map<string, CodeSnippetBlock>();
  // loop through the block linked entries and add them to the map
  links?.entries.block.forEach((entry) => {
    entryBlockMap.set(entry.sys.id, entry);
  });

  return {
    renderNode: {
      [BLOCKS.DOCUMENT]: (_node, children) => <div className="space-y-4">{children}</div>,
      [BLOCKS.PARAGRAPH]: (_node, children) => <p>{children}</p>,
      [BLOCKS.UL_LIST]: (_node, children) => <ul className="list-disc list-outside space-y-2 mx-8">{children}</ul>,
      [BLOCKS.LIST_ITEM]: (_node, children) => <li>{children}</li>,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      [BLOCKS.EMBEDDED_ENTRY]: (node, _children) => {
        // find the entry in the entryMap by ID
        const {
          data: {
            target: {
              sys: { id: entryId },
            },
          },
        } = node;
        const entry = entryBlockMap.get(entryId);
        if (!entry) {
          return null;
        }
        const { __typename: typename } = entry;

        if (typename === "CodeSnippet") {
          const { code, language } = entry;
          return (
            <div>
              <SyntaxHighlighter
                language={language}
                style={oneDark}
                codeTagProps={{
                  className: "bg-slate-900",
                }}
                customStyle={{
                  background: "",
                  backgroundColor: "rgb(15 23 42)",
                  borderRadius: "0.5rem",
                  margin: 0,
                }}
                lineNumberStyle={{
                  minWidth: "2.25em",
                  fontStyle: "normal",
                }}
                showLineNumbers
                showInlineLineNumbers
              >
                {code}
              </SyntaxHighlighter>
            </div>
          );
        }
        return null;
      },
    },
  };
};

export default renderOptions;
