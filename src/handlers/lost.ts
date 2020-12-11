import { Handler, Response, Request } from "express";
import HttpException from "../exceptions/HttpException";

import { Lost } from "../mars/lostRobots";

export const GetLost: Handler = async (
  _request: Request,
  response: Response,
) => {
  try {
    const lostRobots = await Lost();

    return response.send(lostRobots);
  } catch (error) {
    throw new HttpException(
      error.status || 500,
      error.message || "something didn´t work",
    );
  }
};
