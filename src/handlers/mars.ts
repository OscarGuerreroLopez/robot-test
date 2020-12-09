import { Handler, Response, Request } from "express";

import HttpException from "../exceptions/HttpException";

export const Mars: Handler = async (_request: Request, response: Response) => {
  try {
    response.status(200).send({ message: "All good here" });
  } catch (error) {
    throw new HttpException(
      error.status || 500,
      error.message || "something didn´t work",
    );
  }
};
