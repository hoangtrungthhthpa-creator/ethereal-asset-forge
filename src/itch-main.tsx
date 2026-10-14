// Static entry for the itch.io HTML5 build: renders the same game page without the SSR server.
import { StrictMode, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { LanguageProvider } from "./i18n";
import { Route } from "./routes/index";

declare global {
  interface Window {
    GamePix?: { loaded: () => void };
  }
}

const Game = Route.options.component as ComponentType;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <Game />
    </LanguageProvider>
  </StrictMode>,
);
