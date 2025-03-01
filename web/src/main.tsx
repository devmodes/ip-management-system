import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./routes";
import { ThemeProvider } from "@providers/theme-provider";
import { Provider as ReduxProvider } from "react-redux";
import { persistor, store } from "@store/store";
import { AuthProvider } from "@providers/auth-provider";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  </StrictMode>
);
