import { Metadata } from "next";

import WhispearringsPage from "./whispearrings-page";

export const metadata: Metadata = {
  title: "Whispearrings",
};

export default async function Page() {
  return <WhispearringsPage />;
}
