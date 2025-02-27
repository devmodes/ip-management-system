import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./routes";
import { ThemeProvider } from "@providers/theme-provider";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@store/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRouter />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
);
