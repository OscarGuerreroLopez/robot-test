import express from "express";
import requestIp from "request-ip";
import * as bodyParser from "body-parser";

import { EnvVars } from "./utils/validateEnv";
import * as middleware from "./middleware";

import Router from "./router";
import { LoggerMiddleware } from "./middleware";
import { Logger } from "./utils/winstonLogger";

const app = express();

app.use(requestIp.mw());
app.use(middleware.RateLimiterMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(LoggerMiddleware);
app.use("/", Router);

app.use(middleware.ErrorMiddleware);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on("uncaughtException", (e: any) => {
  Logger.error(e.message || JSON.stringify(e), {
    message: "uncaughtException",
    data: e,
  });
  Logger.on("finish", () => process.exit(1));

  setTimeout(() => {
    Logger.end();
  }, 1500);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on("unhandledRejection", (e: any) => {
  Logger.error(e.message || JSON.stringify(e), {
    message: "unhandledRejection",
    data: e,
  });

  Logger.on("finish", () => process.exit(1));

  setTimeout(() => {
    Logger.end();
  }, 1500);
});

app.listen(EnvVars.PORT, () => {
  console.log(`Server is running http://localhost:${EnvVars.PORT}...`);
});
