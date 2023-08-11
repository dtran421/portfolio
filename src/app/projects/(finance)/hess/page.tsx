import { Metadata } from "next";

import HessPage from "./hess-page";

export const metadata: Metadata = {
  title: "HES Pitch",
};

export default async function Page() {
  return <HessPage />;
}
