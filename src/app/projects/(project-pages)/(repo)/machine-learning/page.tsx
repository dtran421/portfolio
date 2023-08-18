import { Metadata } from "next";

import MachineLearningPage from "./machine-learning-page";

export const metadata: Metadata = {
  title: "Machine Learning",
};

export default async function Page() {
  return <MachineLearningPage />;
}
