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

export type Quote = {
  symbol: string;
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
  eps: number;
  high52Weeks: number;
  low52Weeks: number;
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

export interface ResumeSubsection {
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: RichText;
}

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

export interface TimelineEvent {
  heading: string;
  type: EventType;
  date: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: RichText;
}

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
