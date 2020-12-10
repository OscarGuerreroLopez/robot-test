import { Handler, Response, Request } from "express";

import HttpException from "../exceptions/HttpException";
import { Robot } from "../mars";

export const Mars: Handler = async (request: Request, response: Response) => {
  try {
    let robot = Robot();

    let output: string = "";

    for (var i = 1; i < request.instructions.length; i++) {
      let instruction = request.instructions[i];

      const isNewRobot = instruction === "";
      const isRobotStart = instruction.indexOf(" ") > -1;

      if (isNewRobot) {
        robot = Robot();
      } else if (isRobotStart) {
        robot.setPosition(instruction);
      } else {
        output += (output.length > 0 ? "\n" : "") + robot.move(instruction);
      }
    }

    response.status(200).send({ output });
  } catch (error) {
    throw new HttpException(
      error.status || 500,
      error.message || "something didn´t work",
    );
  }
};
