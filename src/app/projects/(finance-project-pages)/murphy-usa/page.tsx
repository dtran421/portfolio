import { Metadata } from "next";

import MurphyUSAPage from "./murphy-usa-page";

export const metadata: Metadata = {
  title: "MUSA Credit Analysis",
};

export default async function Page() {
  return <MurphyUSAPage />;
}
