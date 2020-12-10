import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import BodyException from "../exceptions/BodyEsception";

import { Grid } from "../mars";

export const MarsMiddleware = (
  request: Request,
  _response: Response,
  next: NextFunction,
) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    throw new BodyException(400, "Invalid body, please check", errors);
  }

  if (!request.body.instructions) {
    throw new BodyException(400, "Check the instruction values");
  }

  // Since we are checking the grid size we might as well process it
  // thus just doing this process once, getting the instructions
  const instructions = request.body.instructions.split("\n");
  // instructions included in the request to avoid doing the same thing later on
  request.instructions = instructions;

  const gridSize = instructions[0].split(" ");
  const gridValidation =
    gridSize.length !== 2 || isNaN(gridSize[0]) || isNaN(gridSize[1]);
  if (gridValidation) {
    throw new BodyException(400, "Check the grid values");
  }

  // set a new Grid for the new requests
  // so the properties will stay the same throughout the request
  Grid().setGrid(gridSize[0], gridSize[1]);

  next();
};
