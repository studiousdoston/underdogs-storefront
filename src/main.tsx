import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { CssVarsProvider } from "@mui/joy";

import App from "./App.tsx";
import { store } from "./store.ts";
import { theme } from "./theme.ts";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <CssBaseline>
          <App />
        </CssBaseline>
      </CssVarsProvider>
    </Provider>
  </StrictMode>,
);
