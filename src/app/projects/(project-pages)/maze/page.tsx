import { Metadata } from "next";

import MazePage from "./maze-page";

export const metadata: Metadata = {
  title: "Maze Game",
};

export default async function Page() {
  return <MazePage />;
}
