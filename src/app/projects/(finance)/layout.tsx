import { ReactNode } from "react";

import FinanceLayoutComponent from "./finance-layout";

const FinanceLayout = ({ children }: { children: ReactNode }) => (
  <FinanceLayoutComponent>{children}</FinanceLayoutComponent>
);

export default FinanceLayout;
