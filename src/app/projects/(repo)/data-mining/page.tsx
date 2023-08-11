import { Metadata } from "next";

import DataMiningPage from "./data-mining-page";

export const metadata: Metadata = {
  title: "Data Mining",
};

export default async function Page() {
  return <DataMiningPage />;
}
