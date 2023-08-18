import { Metadata } from "next";

import AdvancedInvestmentsPage from "./advanced-investments-page";

export const metadata: Metadata = {
  title: "Advanced Investments",
};

export default async function Page() {
  return <AdvancedInvestmentsPage />;
}
