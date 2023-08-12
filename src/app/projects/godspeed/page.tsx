import { Metadata } from "next";

import GodspeedPage from "./godspeed-page";

export const metadata: Metadata = {
  title: "Godspeed",
};

export default async function Page() {
  return <GodspeedPage />;
}
