import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const linkVariants = {
    expanded: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -50 }
        }
    },
    collapsed: (index: number) => ({
        y: -125 * (index + 1),
        opacity: 0,
        transition: {
            y: { stiffness: 1000, velocity: 50 }
        }
    })
};

type NavlinkProps = {
    idx: number;
    active: boolean;
    link: string;
    mobile: boolean;
};

const Navlink = ({ idx, active, link, mobile }: NavlinkProps) => (
    <AnimatePresence>
        <motion.li
            custom={idx}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={linkVariants}
            className={`${mobile && "w-full"} flex justify-center`}
        >
            <Link
                href={`/${link === "Portfolio" ? "" : link.toLowerCase()}`}
                passHref
            >
                <div
                    className={`flex justify-center ${
                        mobile ? "w-1/2 border-2 rounded-xl" : "border-b-4"
                    } ${
                        active
                            ? "border-black dark:border-white border-opacity-100"
                            : `${
                                  mobile
                                      ? "border-transparent focus:border-primary"
                                      : "border-b-transparent"
                              } hover:border-primary`
                    } dark-transition hover:cursor-pointer ${
                        mobile ? "px-6 py-1" : "px-5 py-3"
                    }`}
                >
                    {/* // TODO: fix this! */}
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                        className={`text-xl ${
                            active ? "dark:text-white" : "text-primary"
                        }`}
                    >
                        {link}
                    </a>
                </div>
            </Link>
        </motion.li>
    </AnimatePresence>
);

export default Navlink;
