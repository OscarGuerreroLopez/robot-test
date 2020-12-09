class BodyException extends Error {
  status: number;
  message: string;
  stack: any;
  constructor(status: number, message: string, stack?: any) {
    super(message);
    this.status = status;
    this.message = message;
    this.stack = stack || "no stack";
  }
}

export default BodyException;
