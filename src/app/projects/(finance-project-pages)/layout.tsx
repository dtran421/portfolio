import { ReactNode } from "react";

import FinanceProjectLayoutComponent from "./finance-project-layout";

const FinanceProjectLayout = ({ children }: { children: ReactNode }) => (
  <FinanceProjectLayoutComponent>{children}</FinanceProjectLayoutComponent>
);

export default FinanceProjectLayout;
