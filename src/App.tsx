import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { CyclesContextProvider } from "@/contexts/cycles/CyclesContextProvider";
import { Router } from "@/Router";
import { GlobalStyle } from "@/styles/global";
import { defaultTheme } from "@/styles/themes/default";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter basename="/pomodoro-timer">
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}
