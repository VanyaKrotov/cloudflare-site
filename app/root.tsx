import type { LinksFunction } from "@remix-run/cloudflare";
import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { createGlobalStyle } from "styled-components";
import Header from "./modules/header";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

const GlobalStyled = createGlobalStyle`
  html, body {
    height:  100%;
    padding: 0;
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {typeof document === "undefined" ? "[__STYLES__]" : null}
      </head>
      <body>
        <Header />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <GlobalStyled />
        {typeof document === "undefined" ? "[__REDUX_STATE__]" : null}
      </body>
    </html>
  );
}

export default App;
