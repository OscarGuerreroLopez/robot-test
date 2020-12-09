import { Request, Response, NextFunction } from "express";

import HttpException from "../exceptions/HttpException";
import { Logger } from "../utils/winstonLogger";

export const ErrorMiddleware = (
  error: HttpException,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  const stack = error.stack || "No stack";

  Logger.error(message, {
    identifier: "ErrorMiddleware",
    stack,
  });

  response.status(status).json({
    status,
    message,
  });
};
export default ErrorMiddleware;
