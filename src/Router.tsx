import { Route, Routes } from "react-router-dom";

import { DefaultLayout } from "@/layouts/DefaultLayout/DefaultLayout";
import { History } from "@/modules/History/History";
import { Home } from "@/modules/Home/Home";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  );
}
