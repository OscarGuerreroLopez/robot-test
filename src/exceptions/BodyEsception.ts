import { Result, ValidationError } from "express-validator";
// import qs from "qs";

class BodyException extends Error {
  status: number;
  message: string;
  stack: string;
  constructor(
    status: number,
    message: string,
    stack?: Result<ValidationError>,
  ) {
    super(message);
    this.status = status;
    this.message = message;
    this.stack = "no stack";
    console.log(stack);
  }
}

export default BodyException;
