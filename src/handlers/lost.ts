import { Handler, Response, Request } from "express";
import HttpException from "../exceptions/HttpException";

import { Lost } from "../mars/lostRobots";

export const GetLost: Handler = async (
  _request: Request,
  response: Response,
) => {
  try {
    console.log("@@@1111");
    const lostRobots = await Lost();
    console.log("@@@2222", lostRobots);

    return response.send(lostRobots);
  } catch (error) {
    throw new HttpException(
      error.status || 500,
      error.message || "something didn´t work",
    );
  }
};
