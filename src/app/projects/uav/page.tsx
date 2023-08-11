import { Metadata } from "next";

import UAVPage from "./uav-page";

export const metadata: Metadata = {
  title: "UAV Swarms",
};

export default async function Page() {
  return <UAVPage />;
}
