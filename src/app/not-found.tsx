import { Metadata } from "next";

import { openGraph } from "./layout";
import NotFoundPage from "./not-found-page";

export const metadata: Metadata = {
  title: "Error | Page Not Found",
  openGraph,
};

export default async function Page() {
  return <NotFoundPage />;
}
