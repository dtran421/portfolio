import { useCallback, useEffect, useRef, useState } from "react";

import { isNullish } from "@/utils/CommonUtil";

interface CarouselImage {
  label: string;
  pic: string;
  width: number;
  height: number;
}

const TRANSITION_DURATION = 250;

export const useCarouselControl = (carousel: CarouselImage[]) => {
  const numImages = carousel.length;

  const typewriterRef = useRef<HTMLDivElement>(null);
  const [currentImage, setCurrentImage] = useState(0);

  const [isEntering, toggleEntering] = useState(false);
  const [phase, setPhase] = useState<"invisible" | "visible">("invisible");
  const [phaseTimeout, setPhaseTimeout] = useState<NodeJS.Timeout | null>(null);

  /*
   * Set up carousel image rotation
   */
  useEffect(() => {
    if (phase === "invisible" && isEntering) {
      toggleEntering(false);
      const nextImage = currentImage + 1;
      setCurrentImage(nextImage > numImages ? 1 : nextImage);
    }
  }, [currentImage, isEntering, numImages, phase]);

  const typewriterListener = useCallback(() => {
    if (isNullish(typewriterRef.current)) {
      return;
    }

    const parentDiv = typewriterRef.current as HTMLDivElement;
    const typewriterText = (parentDiv.children[0] as HTMLSpanElement).innerText;

    if (typewriterText.length !== 2) {
      return;
    }

    if (phase === "invisible") {
      toggleEntering(true);
      setPhaseTimeout(setTimeout(() => setPhase("visible"), TRANSITION_DURATION));
      return;
    }

    setPhase("invisible");
  }, [phase]);

  /*
   * Set up listener for changes to the typewriter text
   */
  useEffect(() => {
    const typewriterObserver = new MutationObserver(typewriterListener);
    if (typewriterRef.current) {
      typewriterObserver.observe(typewriterRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      typewriterObserver.disconnect();
      if (phaseTimeout) {
        clearTimeout(phaseTimeout);
      }
    };
  }, [phaseTimeout, typewriterListener]);

  return { currentImage, phase, typewriterRef };
};
