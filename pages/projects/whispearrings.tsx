import {
    useRef,
    useState,
    useEffect,
    useMemo,
    createRef,
    RefObject
} from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { FaApple } from "react-icons/fa";

import { lgScreenQuery } from "../../components/Global/configs/Breakpoints";
import Contexts from "../../Contexts";
import whispearringsData from "../../public/json/whispearrings.json";

import ProjectLayout from "../../components/Global/layouts/ProjectLayout";

const MenuBar = dynamic(
    () => import("../../components/Projects/Whispearrings/MenuBar"),
    { ssr: false }
);

const getActiveParagraph = (pRefs: RefObject<HTMLParagraphElement>[]) => {
    const midHeight =
        (window.innerHeight || document.documentElement.clientHeight) / 2;

    const dists = pRefs.map((pRef) => {
        const rect = pRef.current.getBoundingClientRect();
        const middle = rect.top + (rect.bottom - rect.top) / 2;
        return Math.abs(midHeight - middle);
    });

    return dists.indexOf(Math.min(...dists));
};

type ParagraphProps = {
    lgScreen: boolean;
    pRefs: RefObject<HTMLParagraphElement>[];
    idx: number;
    paragraph: {
        heading: string;
        body: string;
    };
};

const Paragraph = ({
    lgScreen,
    pRefs,
    idx,
    paragraph: { heading, body }
}: ParagraphProps) => (
    <div id={`paragraph${idx + 1}`} className="space-y-6">
        <h2 className="text-3xl font-semibold">{heading}</h2>
        <p ref={pRefs[idx]} className="text-xl leading-relaxed">
            {body}
        </p>
        {!lgScreen && (
            <div className="flex justify-center pt-6">
                <Image
                    alt={`whispearrings video ${idx + 1}`}
                    src={`/img/projects/whispearrings/whispearrings${
                        idx + 1
                    }.gif`}
                    className="z-10 relative rounded-xl"
                    width={240}
                    height={520}
                />
            </div>
        )}
    </div>
);

const Whispearrings = () => {
    const lgScreen = useMediaQuery(lgScreenQuery);

    const { WhispearringsContext } = Contexts;

    const { data: paragraphs } = whispearringsData;

    const pRefsRef = useRef<RefObject<HTMLParagraphElement | null>[]>(
        paragraphs.map(() => createRef<HTMLParagraphElement>())
    );
    const { current: pRefs } = pRefsRef;
    const [activeP, setActiveP] = useState(-1);

    const [[imageAnimation, opacityAnimation], setAnimations] = useState([
        null,
        null
    ]);
    const [imgClass, setImgClass] = useState(
        "z-10 relative rounded-xl opacity-0 transition duration-200 ease-linear"
    );
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
                        setTimeout(() => setActiveP(newActiveP), 250),
                        setTimeout(
                            () =>
                                setImgClass(
                                    imgClass.replace("opacity-0", "opacity-100")
                                ),
                            250
                        )
                    ]);
                }
            }
        };

        if (activeP === -1 && pRefs[0].current) {
            setTimeout(
                () => setImgClass(imgClass.replace("opacity-0", "opacity-100")),
                250
            );
            setActiveP(0);
        }

        document.addEventListener("scroll", scrollListener);

        return () => document.removeEventListener("scroll", scrollListener);
    }, [
        activeP,
        pRefs,
        imgClass,
        autoScroll,
        imageAnimation,
        opacityAnimation
    ]);

    const whispearringsContextObject = useMemo(
        () => ({
            activeP,
            setActiveP,
            pRefs,
            setAutoScroll
        }),
        [activeP, pRefs]
    );

    return (
        <ProjectLayout
            page="Whispearrings"
            accentColor="bg-whispearrings"
            darkText
            github="https://github.com/dtran421/Whispearrings-swift"
        >
            <div className="md:max-w-2xl lg:max-w-4xl xl:max-w-6xl relative flex flex-col items-center gap-y-20 mx-10 md:mx-auto mt-10 mb-20">
                <div className="w-full lg:w-3/4 flex flex-col items-center space-y-6">
                    <h1 className="text-4xl text-center font-bold">
                        Background & Motivation
                    </h1>
                    <p className="text-xl text-center leading-relaxed">
                        {`For my summer internship with Whispearrings, I was the sole mobile app developer tasked with 
                  spearheading the development of their iOS app. Since this was my first time doing mobile app
                  development, I needed to research various new technologies, including XCode, Swift (Objective-C), and
                  SQLite for the database. After two short but grueling months, I was able to produce an app that incorporated
                  all of the techniques and coding concepts that I had been learning and performed the basic functions that
                  my supervisors had asked for.`}
                    </p>
                </div>
                <WhispearringsContext.Provider
                    value={whispearringsContextObject}
                >
                    {lgScreen && (
                        <MenuBar
                            {...{ activeP, pRefs, setAutoScroll, paragraphs }}
                        />
                    )}
                </WhispearringsContext.Provider>
                <div className="flex">
                    <div className="w-full lg:w-1/2 flex flex-col items-center space-y-40 lg:space-y-80 py-10 lg:py-48">
                        {paragraphs.map((paragraph, idx) => (
                            <Paragraph
                                // eslint-disable-next-line react/no-array-index-key
                                key={idx}
                                {...{ lgScreen, pRefs, idx, paragraph }}
                            />
                        ))}
                    </div>
                    {lgScreen && (
                        <div className="w-1/2 relative flex flex-col space-y-32">
                            <div className="h-min sticky right-1/4 inset-y-1/4 flex justify-center items-start">
                                <div className="relative flex items-center bg-zinc-800 dark:bg-zinc-200 dark-transition rounded-xl p-2">
                                    <div className="absolute left-0 top-0 z-20 w-full flex justify-center">
                                        <div className="w-1/2 h-7 bg-zinc-800 dark:bg-zinc-200 dark-transition rounded-b-xl" />
                                    </div>
                                    <Image
                                        alt={`whispearrings video ${
                                            activeP + 1
                                        }`}
                                        src={`/img/projects/whispearrings/whispearrings${
                                            activeP + 1
                                        }.gif`}
                                        className={imgClass}
                                        width={240}
                                        height={520}
                                    />
                                    <div className="absolute left-0 top-1/4 w-full h-full flex justify-center items-start">
                                        <FaApple
                                            size={48}
                                            className="text-zinc-300/50 dark:text-zinc-700/50 dark-transition"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ProjectLayout>
    );
};

export default Whispearrings;
