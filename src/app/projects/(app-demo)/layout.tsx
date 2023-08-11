import { ReactNode } from "react";

import AppDemoLayoutComponent from "./app-demo-layout";

const AppDemoLayout = ({ children }: { children: ReactNode }) => (
  <AppDemoLayoutComponent>{children}</AppDemoLayoutComponent>
);

export default AppDemoLayout;
