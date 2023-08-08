import { Dispatch, SetStateAction } from "react";

import { Document } from "@contentful/rich-text-types";

/**
 * context types
 */
export type ThemeContextObject = {
  darkMode: boolean;
  toggleDarkMode: Dispatch<SetStateAction<boolean>>;
};

/**
 * api types
 */
export type APIResponse<T> =
  | {
      data: T;
    }
  | {
      error: string;
    };

/**
 * JSON schemas
 */
export type Project = {
  link: string;
  accentColor: string;
  darkText: boolean;
  github?: string;
  thumbnail: string;
  width: number;
  height: number;
};

/**
 * Contentful Schemas
 */
export type CodeSnippetBlock = {
  sys: { id: string };
  __typename: string;
  code: string;
  language: string;
};

export type Links = {
  entries: {
    block: CodeSnippetBlock[];
  };
};

export type RichText = {
  json: Document;
  links?: Links;
};

export interface SummaryData {
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: RichText;
}

export type ResumeSubsection = {
  title: string;
  organization: string;
} & SummaryData;

export interface ResumeTabSection {
  heading: string;
  subsectionsCollection: { items: ResumeSubsection[] };
}

export interface BubbleSection {
  heading: string;
  items: string[];
}

export interface ResumeBubblesSection {
  heading: string;
  items: BubbleSection[];
}

export enum EventType {
  EDUCATION = "Education",
  INTERNSHIP = "Internship",
  WORK = "Work",
}

export type TimelineEvent = {
  heading: string;
  type: EventType;
  date: string;
} & SummaryData;

export interface Language {
  name: string;
  img: {
    url: string;
  };
  accentColor: string;
  darkText: boolean;
}

export interface LanguageGroup {
  heading: string;
  description: string;
  emoji: string;
  emojiLabel: string;
  languagesCollection: { items: Language[] };
}

export interface BlogPost {
  postId: string;
  title: string;
  publishDate: string;
  topicTags: string[];
  heroBanner: {
    title: string;
    url: string;
    width: number;
    height: number;
  };
  body: RichText;
}

/**
 * Alphavantage schemas
 */

export type Quote = {
  price: number;
  change: number;
  changePct: number;
  latestBusinessDay: string;
};

export type Company = {
  name: string;
  exchange: string;
  sector: string;
  industry: string;
  marketCap: number;
  dividendYield: number;
  eps: string;
  high52Weeks: string;
  low52Weeks: string;
};

export const ALPHAVANTAGE_FUNCTIONS = ["GLOBAL_QUOTE", "OVERVIEW"] as const;

export const ALPHAVANTAGE_FN_TO_ROUTE = {
  GLOBAL_QUOTE: "quote",
  OVERVIEW: "company",
} as const;
