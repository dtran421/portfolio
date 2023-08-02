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

export type SubsectionObject = {
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: RichText;
};

export type EventObject = {
  heading: string;
  type: string;
  date: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: RichText;
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

export type BlogPost = {
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
};
