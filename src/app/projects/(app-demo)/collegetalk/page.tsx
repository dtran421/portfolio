import { Metadata } from "next";

import CollegeTalkPage from "./collegetalk-page";

export const metadata: Metadata = {
  title: "CollegeTalk",
};

export default async function Page() {
  return <CollegeTalkPage />;
}
