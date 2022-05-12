import { Dispatch, SetStateAction, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowDownCircle } from "react-icons/fi";
import { MdSchool, MdWork, MdDesktopMac } from "react-icons/md";

import { mdScreenQuery } from "../Global/configs/Breakpoints";
import { Description, EventObject } from "../../types";

export const expandVariants = {
    open: { opacity: 1, height: "auto" },
    collapsed: { opacity: 0, height: 0 }
};

const tagVariants = {
    open: { opacity: 1, x: 0 },
    collapsed: (side) => ({ opacity: 0, x: (side === "L" ? -1 : 1) * 50 })
};

export const convertDateToString = (
    rawDateStr: string,
    currentlyWorking?: boolean
): string => {
    if (currentlyWorking !== null && currentlyWorking) {
        return "Present";
    }

    const month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];

    const date = rawDateStr.split("T")[0].split("-");
    return `${month[parseInt(date[1], 10) - 1]} ${date[0]}`;
};

type CardProps = {
    side: string;
    isExpanded: boolean;
    setExpanded: Dispatch<SetStateAction<boolean>>;
    heading: string;
    description: Description;
};

const Card = ({
    side,
    isExpanded,
    setExpanded,
    heading,
    description
}: CardProps) => {
    const iconClass = { size: 24, className: "text-white" };

    return (
        <div
            className={`overflow-hidden order-1 ${
                side === "L" ? "bg-primary" : "bg-secondary"
            } rounded-lg shadow-xl w-10/12 md:w-5/12 p-4`}
        >
            <div className="flex justify-between space-x-2">
                <h3 className="font-bold text-white text-lg">{heading}</h3>
                <motion.button
                    initial={false}
                    animate={isExpanded ? { rotate: -180 } : { rotate: 0 }}
                    transition={{ duration: 0.25, ease: "linear" }}
                    onClick={() => setExpanded(!isExpanded)}
                >
                    <FiArrowDownCircle {...iconClass} />
                </motion.button>
            </div>
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={expandVariants}
                        transition={{ duration: 0.25, ease: "linear" }}
                    >
                        {description.json.content.map(({ content }, idx) => (
                            <p
                                // eslint-disable-next-line react/no-array-index-key
                                key={idx}
                                className="text-xs lg:text-sm font-medium leading-snug tracking-wide text-white text-opacity-100 mt-3"
                            >
                                {content[0].value}
                            </p>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

type EventProps = {
    side: string;
    data: EventObject;
};

const Event = ({
    side,
    data: { heading, type, startDate, endDate, currentlyWorking, description }
}: EventProps) => {
    const mdScreen = useMediaQuery(mdScreenQuery);
    const [isExpanded, setExpanded] = useState(false);

    const iconProps = {
        className: "text-zinc-200 dark:text-zinc-800 dark-transition",
        size: 20
    };

    let icon;
    if (type === "Education") {
        icon = <MdSchool {...iconProps} />;
    } else if (type === "Internship") {
        icon = <MdDesktopMac {...iconProps} />;
    } else if (type === "Work") {
        icon = <MdWork {...iconProps} />;
    }

    const startDateStr = convertDateToString(startDate);
    const endDateStr = convertDateToString(endDate, currentlyWorking);
    const dateStr = `${startDateStr} - ${endDateStr}`;

    return mdScreen ? (
        <div
            className={`w-full flex ${
                side === "R" && "flex-row-reverse"
            } justify-between items-center`}
        >
            <Card
                {...{ side, isExpanded, setExpanded, heading, description }}
            />
            <div className="z-10 w-8 h-8 flex items-center order-1 bg-zinc-700 dark:bg-zinc-300 dark-transition backdrop-blur-lg rounded-full">
                <h1 className="mx-auto font-semibold">{icon}</h1>
            </div>
            <div
                className={`order-1 w-5/12 flex ${
                    side === "L" ? "justify-start" : "justify-end"
                }`}
            >
                <AnimatePresence>
                    {isExpanded && (
                        <motion.p
                            custom={side}
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={tagVariants}
                            transition={{
                                duration: 0.25,
                                type: "spring",
                                damping: 100,
                                stiffness: 1000
                            }}
                            className="bg-zinc-700 dark:bg-zinc-300 lg:text-lg text-white dark:text-black dark-transition rounded-lg px-4 py-1"
                        >
                            {dateStr}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    ) : (
        <div className="flex justify-between items-center">
            <div className="z-10 w-8 h-8 flex items-center order-1 bg-zinc-700 dark:bg-zinc-300 dark-transition backdrop-blur-lg rounded-full">
                <h1 className="mx-auto font-semibold">{icon}</h1>
            </div>
            <Card
                {...{ side, isExpanded, setExpanded, heading, description }}
            />
        </div>
    );
};

export default Event;
