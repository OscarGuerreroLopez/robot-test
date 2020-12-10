import { Handler, Response, Request } from "express";

import HttpException from "../exceptions/HttpException";
import { Robot } from "../mars";

export const Mars: Handler = async (request: Request, response: Response) => {
  try {
    let robot = Robot();

    let output: string = "";

    for (var i = 1; i < request.instructions.length; i++) {
      let instruction = request.instructions[i];

      // if instruction is empty then we are dealing with a new robot
      const isNewRobot = instruction === "";
      // if instruction has an empty space, like 1 1 E, then it is the start
      // otherwise the instruction would come like "FRRFLLFFRRFLL"
      const isRobotStart = instruction.includes(" ");

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
