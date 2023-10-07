import { useMemo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

import { CodeSnippetBlock, Links } from "../utils/types";

const CodeSnippet = ({ code, language }: Omit<CodeSnippetBlock, "sys" | "__typename">) => (
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

const useRichTextRenderOptions = (links: Links | undefined) => {
  const entryBlockMap = useMemo(() => {
    const map = new Map<string, CodeSnippetBlock>();

    links?.entries.block.forEach((entry) => {
      map.set(entry.sys.id, entry);
    });
    return map;
  }, [links?.entries.block]);

  const renderOptions = useMemo<Options>(
    () => ({
      renderNode: {
        [BLOCKS.DOCUMENT]: (_node, children) => <div className="space-y-4">{children}</div>,
        [BLOCKS.PARAGRAPH]: (_node, children) => <p>{children}</p>,
        [BLOCKS.UL_LIST]: (_node, children) => <ul className="list-disc list-outside space-y-2 mx-8">{children}</ul>,
        [BLOCKS.LIST_ITEM]: (_node, children) => <li>{children}</li>,
        [BLOCKS.EMBEDDED_ENTRY]: (node, _children) => {
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
            return <CodeSnippet code={entry.code} language={entry.language} />;
          }
          return null;
        },
      },
    }),
    [entryBlockMap]
  );

  return {
    renderOptions,
  };
};

export default useRichTextRenderOptions;
