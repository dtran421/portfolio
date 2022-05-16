import { Dispatch, SetStateAction } from "react";

/**
 * context types
 */
export type ThemeContextObject = {
    darkMode: boolean;
    toggleDarkMode: Dispatch<SetStateAction<boolean>>;
};

/**
 * JSON schemas
 */
export type Project = {
    link: string;
    accentColor: string;
    darkText: boolean;
    thumbnail: string;
    width: number;
    height: number;
};

/**
 * Contentful Schemas
 */
export type RichDescription = {
    json: {
        data: Record<string, unknown>;
        content: {
            data: Record<string, unknown>;
            content: [
                {
                    data: Record<string, unknown>;
                    marks: [];
                    value: string;
                    nodeType: string;
                }
            ];
            nodeType: string;
        }[];
    };
};

export type SubsectionObject = {
    title: string;
    organization: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    description: RichDescription;
};

export type EventObject = {
    heading: string;
    type: string;
    date: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    description: RichDescription;
};

export type Language = {
    name: string;
    img: {
        url: string;
    };
    accentColor: string;
    darkText: boolean;
};

export type LanguageGroup = {
    heading: string;
    description: string;
    emoji: string;
    emojiLabel: string;
    languagesCollection: { items: Language[] };
};
