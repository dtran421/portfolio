import { Dispatch, SetStateAction } from "react";

export type ThemeContextObject = {
    darkMode: boolean;
    toggleDarkMode: Dispatch<SetStateAction<boolean>>;
};

/**
 * Contentful Schemas
 */
export type Description = {
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
    description: Description;
};

export type EventObject = {
    heading: string;
    type: string;
    date: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    description: Description;
};
