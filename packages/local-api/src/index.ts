import path from "path";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

import { createCellsRouter } from "./routes";

export const serve = async (
  port: number,
  filename: string,
  dir: string,
  useProxy = false
) => {
  const app = express();

  app.use(createCellsRouter(filename, dir));

  // Serve the client app in development from vite server
  if (useProxy) {
    app.use(
      createProxyMiddleware({
        target: "http://localhost:3000",
        logLevel: "silent",
        ws: true,
      })
    );
  } else {
    // Serve the client app in production as static file
    const packagePath = require.resolve(
      "@codenail/local-client/dist/index.html"
    );
    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};
