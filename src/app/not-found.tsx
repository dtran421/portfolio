import { Metadata } from "next";

import NotFoundPage from "./not-found-page";
import { openGraph } from "./shared-metadata";

export const metadata: Metadata = {
  title: "Error | Page Not Found",
  openGraph,
};

export default async function Page() {
  return <NotFoundPage />;
}
