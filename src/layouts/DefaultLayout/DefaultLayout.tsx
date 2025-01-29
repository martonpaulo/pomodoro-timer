import { Outlet } from "react-router-dom";

import { Header } from "@/components/Header/Header";
import { LayoutContainer } from "@/layouts/DefaultLayout/DefaultLayout.styles";

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  );
}
