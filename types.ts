import { Dispatch, SetStateAction } from "react";

export type ThemeContextObject = {
    darkMode: boolean;
    toggleDarkMode: Dispatch<SetStateAction<boolean>>;
};

export type SubsectionObject = {
    title: string;
    organization: string;
    date: string;
    description: string;
};

export type EventObject = {
    heading: string;
    type: string;
    date: string;
    body: string;
};
