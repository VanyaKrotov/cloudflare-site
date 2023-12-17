/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import { type AppLoadContext, type EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import { Provider as StoreProvider } from "react-redux";
// import isbot from "isbot";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";

import { store } from "./store";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  // This is ignored so we can keep it in the template for visibility.  Feel
  // free to delete this parameter in your app if you're not using it!
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadContext: AppLoadContext
) {
  const sheet = new ServerStyleSheet();
  let body: string = "";
  try {
    body = renderToString(
      sheet.collectStyles(
        <StoreProvider store={store}>
          <RemixServer context={remixContext} url={request.url} />
        </StoreProvider>
      )
    )
      .replace("[__STYLES__]", sheet.getStyleTags())
      .replace(
        "[__REDUX_STATE__]",
        `<script type="text/javascript">window["REDUX_STATE"]=${JSON.stringify(
          store.getState()
        )};</script>`
      );
  } catch (error) {
    console.error(error);
    responseStatusCode = 500;
  }

  // const body = await renderToReadableStream(
  //   <StyleSheetManager sheet={sheet.instance}>
  //     <RemixServer context={remixContext} url={request.url} />
  //   </StyleSheetManager>,
  //   {
  //     signal: request.signal,
  //     onError(error: unknown) {
  //       // Log streaming rendering errors from inside the shell
  //       console.error(error);
  //       responseStatusCode = 500;
  //     },
  //   }
  // );

  // if (isbot(request.headers.get("user-agent"))) {
  //   await body.allReady;
  // }

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
