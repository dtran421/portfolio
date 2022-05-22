import { useContext } from "react";
import { Link } from "react-scroll";
import { AnimateSharedLayout, motion } from "framer-motion";

import Contexts from "../../../Contexts";

const { WhispearringsContext } = Contexts;

type NavButtonProps = {
    heading: string;
    idx: number;
    active: boolean;
    offset: number;
};

const NavButton = ({ heading, idx, active, offset }: NavButtonProps) => {
    const { setAutoScroll, setActiveP } = useContext(WhispearringsContext);

    return (
        <Link
            to={`paragraph${idx + 1}`}
            smooth="easeLinear"
            offset={offset}
            duration={250}
            onClick={() => {
                setAutoScroll(true);
                setActiveP(idx);
                setTimeout(() => setAutoScroll(false), 250);
            }}
            className="relative flex justify-center text-xl rounded-full hover:bg-zinc-300/40 dark:hover:bg-zinc-700/40 transition duration-100 ease-linear cursor-pointer px-6 py-1"
        >
            {heading}
            {active ? (
                <motion.div
                    className="active"
                    layoutId="active"
                    transition={{ duration: 0.3, ease: "easeIn" }}
                />
            ) : null}
        </Link>
    );
};

type MenuBarProps = {
    paragraphs: { heading: string; body: string }[];
};

const MenuBar = ({ paragraphs }: MenuBarProps) => {
    const { activeP, pRefs, setAutoScroll } = useContext(WhispearringsContext);
    return (
        <div className="sticky top-24 z-10 rounded-full flex bg-zinc-100/75 dark:bg-zinc-900/75 backdrop-blur-lg border-2 border-zinc-300 dark:border-zinc-700 dark-transition mt-10">
            <AnimateSharedLayout>
                {(window || document) &&
                    activeP !== -1 &&
                    paragraphs.map(({ heading }, idx) => {
                        const midHeight =
                            (window.innerHeight ||
                                document.documentElement.clientHeight) / 2;
                        const rect = pRefs[idx].current.getBoundingClientRect();
                        const height = rect.bottom - rect.top;
                        const offset = -(midHeight - height / 2);
                        const active = activeP === idx;
                        return (
                            <NavButton
                                key={heading}
                                {...{
                                    setAutoScroll,
                                    heading,
                                    idx,
                                    active,
                                    offset
                                }}
                            />
                        );
                    })}
            </AnimateSharedLayout>
        </div>
    );
};

export default MenuBar;
