import { Request, Response, NextFunction } from "express";
import { Logger } from "../utils/winstonLogger";

export const LoggerMiddleware = (
  request: Request,
  _response: Response,
  next: NextFunction,
): void => {
  Logger.info(`${request.method} ${request.path} ${request.hostname}`, {
    identifier: "LoggerMiddleware",
  });

  next();
};
