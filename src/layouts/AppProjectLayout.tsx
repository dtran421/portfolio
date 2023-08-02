import { useRef, useState, useEffect, useMemo, createRef, RefObject, ReactNode } from "react";
import dynamic from "next/dynamic";

import Contexts from "../lib/Contexts";

import ProjectLayout from "./ProjectLayout";
import Paragraph from "../components/Projects/AppProject/Paragraph";

const MenuBar = dynamic(() => import("../components/Projects/AppProject/MenuBar"), {
  ssr: false,
});

const PhoneDemo = dynamic(() => import("../components/Projects/AppProject/PhoneDemo"), {
  ssr: false,
});

const getActiveParagraph = (pRefs: RefObject<HTMLParagraphElement>[]) => {
  const midHeight = (window.innerHeight || document.documentElement.clientHeight) / 2;

  const dists = pRefs.map((pRef) => {
    const rect = pRef.current.getBoundingClientRect();
    const middle = rect.top + (rect.bottom - rect.top) / 2;
    return Math.abs(midHeight - middle);
  });

  return dists.indexOf(Math.min(...dists));
};

type AppProjectLayoutProps = {
  page: string;
  github: string;
  projectData: {
    data: {
      heading: string;
      body: string;
    }[];
  };
  placeholder: ReactNode;
  children: ReactNode;
};

const AppProjectLayout = ({ page, github, projectData, placeholder, children: description }: AppProjectLayoutProps) => {
  const { AppProjectContext } = Contexts;

  const { data: paragraphs } = projectData;

  const pRefsRef = useRef<RefObject<HTMLParagraphElement | null>[]>(
    paragraphs.map(() => createRef<HTMLParagraphElement>())
  );
  const { current: pRefs } = pRefsRef;
  const [activeP, setActiveP] = useState(-1);

  const [[imageAnimation, opacityAnimation], setAnimations] = useState([null, null]);
  const [imgClass, setImgClass] = useState("z-10 relative rounded-3xl opacity-0 transition duration-200 ease-linear");
  const [autoScroll, setAutoScroll] = useState(false);

  useEffect(() => {
    const scrollListener = () => {
      if (!autoScroll && activeP !== -1 && pRefs[activeP].current) {
        const newActiveP = getActiveParagraph(pRefs);
        if (newActiveP !== activeP) {
          setImgClass(imgClass.replace("opacity-100", "opacity-0"));
          if (imageAnimation != null && opacityAnimation != null) {
            clearTimeout(imageAnimation);
            clearTimeout(opacityAnimation);
          }
          setAnimations([
            setTimeout(() => setActiveP(newActiveP), 500),
            setTimeout(() => setImgClass(imgClass.replace("opacity-0", "opacity-100")), 500),
          ]);
        }
      }
    };

    if (activeP === -1 && pRefs[0].current) {
      setActiveP(0);
      setTimeout(() => setImgClass(imgClass.replace("opacity-0", "opacity-100")), 250);
    }

    document.addEventListener("scroll", scrollListener);

    return () => document.removeEventListener("scroll", scrollListener);
  }, [activeP, pRefs, imgClass, autoScroll, imageAnimation, opacityAnimation]);

  const appProjectContextObject = useMemo(
    () => ({
      activeP,
      setActiveP,
      pRefs,
      setAutoScroll,
    }),
    [activeP, pRefs]
  );

  return (
    <ProjectLayout {...{ page, github }} type="coding">
      <div className="md:max-w-xl lg:max-w-3xl xl:max-w-5xl relative flex flex-col items-center gap-y-20 mx-10 md:mx-auto mt-10 lg:mb-30">
        <div className="w-full lg:w-3/4 flex flex-col items-center space-y-6">
          <h1 className="text-4xl text-center font-bold">Background & Motivation</h1>
          <p className="text-xl text-center leading-relaxed">{description}</p>
        </div>
        <AppProjectContext.Provider value={appProjectContextObject}>
          <MenuBar {...{ activeP, pRefs, setAutoScroll, paragraphs }} />
        </AppProjectContext.Provider>
        <div className="flex">
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            {paragraphs.map((paragraph, idx) => (
              <Paragraph key={paragraph.heading} {...{ pRefs, idx, paragraph }} page={page.toLowerCase()} />
            ))}
          </div>
          <PhoneDemo {...{ activeP, imgClass, placeholder }} page={page.toLowerCase()} />
        </div>
      </div>
    </ProjectLayout>
  );
};

export default AppProjectLayout;
