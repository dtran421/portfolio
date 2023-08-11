import { ReactNode } from "react";

import AppProjectLayoutComponent from "./app-project-layout";

const AppProjectLayout = ({ children }: { children: ReactNode }) => (
  <AppProjectLayoutComponent>{children}</AppProjectLayoutComponent>
);

export default AppProjectLayout;
