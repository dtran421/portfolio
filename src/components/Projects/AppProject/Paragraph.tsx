import { ForwardedRef, forwardRef, MutableRefObject, ReactNode, useEffect, useRef } from "react";

type ParagraphProps = {
  heading: string;
  body: string;
  idx: number;
  setParagraphPosition: (paragraph: HTMLDivElement, paragraphNum: number) => void;
  children: ReactNode;
};

const Paragraph = (
  { heading, body, idx, setParagraphPosition, children }: ParagraphProps,
  ref: ForwardedRef<HTMLDivElement> | null
) => {
  const paragraphRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (paragraphRef.current) {
      setParagraphPosition(paragraphRef.current, idx);
    }
  }, [idx, paragraphRef, setParagraphPosition]);

  useEffect(() => {
    if (ref) {
      // eslint-disable-next-line no-param-reassign
      (ref as MutableRefObject<HTMLDivElement | null>).current = paragraphRef.current;
    }
  }, [ref]);

  return (
    <div
      ref={paragraphRef}
      className="space-y-6 first:pt-0 pt-20 lg:pt-40 pb-20 lg:pb-40 last:pb-10 lg:last:pb-[500px]"
    >
      <h2 className="text-3xl font-semibold">{heading}</h2>
      <p className="text-xl leading-relaxed">{body}</p>
      {children}
    </div>
  );
};

export default forwardRef(Paragraph);
