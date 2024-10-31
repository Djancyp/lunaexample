import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import Routes from "./routes";

export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <Routes />
      </StaticRouter>
    </StrictMode>
  );
  return { html };
}
