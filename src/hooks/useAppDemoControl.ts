import { useCallback, useEffect, useRef, useState } from "react";
import findIndex from "lodash/findIndex";
import range from "lodash/range";

import { getViewportMidY } from "@/utils/ClientUtil";

const useAppDemoControl = (numParagraphs: number) => {
  const activeRef = useRef<HTMLDivElement>(null);
  const [activeParagraph, setActiveParagraph] = useState(-1);

  const [paragraphPositions, setParagraphPositions] = useState<Record<number, [number, number]>>({});

  const setParagraphPosition = useCallback((paragraph: HTMLDivElement, paragraphNum: number) => {
    const boundingRect = paragraph.getBoundingClientRect();
    setParagraphPositions((prevPositions) => ({
      ...prevPositions,
      [paragraphNum]: [boundingRect.top + window.scrollY, boundingRect.bottom + window.scrollY],
    }));
  }, []);

  const [isScrolling, setScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  const getActiveParagraph = useCallback(() => {
    if (Object.keys(paragraphPositions).length !== numParagraphs || getViewportMidY() < paragraphPositions[0][0]) {
      return 0;
    }

    if (getViewportMidY() > paragraphPositions[numParagraphs - 1][1]) {
      return numParagraphs - 1;
    }

    return Math.max(
      findIndex(
        range(0, numParagraphs),
        (paragraph) =>
          getViewportMidY() >= paragraphPositions[paragraph][0] && getViewportMidY() <= paragraphPositions[paragraph][1]
      ),
      0
    );
  }, [numParagraphs, paragraphPositions]);

  const scrollListener = useCallback(() => {
    if (!activeRef.current || isScrolling) {
      return;
    }

    if (
      (getViewportMidY() < paragraphPositions[0][0] && activeParagraph === 0) ||
      (getViewportMidY() >= paragraphPositions[activeParagraph][0] &&
        getViewportMidY() <= paragraphPositions[activeParagraph][1])
    ) {
      return;
    }

    setScrolling(true);

    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    setScrollTimeout(setTimeout(() => setScrolling(false), 2000));
  }, [activeParagraph, isScrolling, paragraphPositions, scrollTimeout]);

  /*
   * Setup
   *
   * When the component mounts, we need to add a scroll listener to the document.
   */
  useEffect(() => {
    document.addEventListener("scroll", scrollListener);

    return () => {
      document.removeEventListener("scroll", scrollListener);
    };
  }, [scrollListener]);

  /*
   * Update the active paragraph
   *
   * After the user has stopped scrolling (or autoscroll), we need to update the active paragraph
   * to the closest paragraph to the middle of the viewport.
   */
  useEffect(() => {
    if (!activeRef.current || isScrolling) {
      return;
    }

    const newParagraph = getActiveParagraph();
    /* console.log(getViewportMidY());
    console.log("newParagraph", newParagraph); */
    if (newParagraph === activeParagraph) {
      return;
    }

    setActiveParagraph(newParagraph);
  }, [activeParagraph, getActiveParagraph, isScrolling, paragraphPositions]);

  const scrollToParagraph = useCallback(
    (newParagraph: number) => {
      if (newParagraph === activeParagraph) {
        return;
      }

      setScrolling(true);

      const [topY, bottomY] = paragraphPositions[newParagraph];

      window.scrollTo({
        top: topY + (bottomY - topY) / 2 - window.innerHeight / 2,
        behavior: "smooth",
      });

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      setScrollTimeout(setTimeout(() => setScrolling(false), 2000));
      setActiveParagraph(newParagraph);
    },
    [activeParagraph, paragraphPositions, scrollTimeout]
  );

  return {
    activeRef,
    activeParagraph,
    setParagraphPosition,
    isScrolling,
    scrollToParagraph,
  };
};

export default useAppDemoControl;
