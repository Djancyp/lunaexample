import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </StrictMode>
);
