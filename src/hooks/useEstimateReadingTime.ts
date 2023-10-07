import { useMemo } from "react";
import sum from "lodash/sum";

import { TopLevelBlock } from "@contentful/rich-text-types";

const AVG_READ_SPEED = 250; // words per minute
const AVG_WORD_LENGTH = 6; // letters per word

const useEstimateReadingTime = (content: TopLevelBlock[]) => {
  const getNumCharsInBlock = (block: TopLevelBlock) => {
    if (block.nodeType !== "paragraph") {
      return 0;
    }

    return sum(
      block.content.map((childBlock) =>
        childBlock.nodeType === "text" ? sum(childBlock.value.split(" ").map((word) => word.length)) : 0
      )
    );
  };

  const readTimeEstimate = useMemo(() => {
    const totalChars = sum(content.map(getNumCharsInBlock));

    return Math.ceil(totalChars / (AVG_READ_SPEED * AVG_WORD_LENGTH));
  }, [content]);

  return { readTimeEstimate };
};

export default useEstimateReadingTime;
