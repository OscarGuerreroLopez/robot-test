import HttpException from "./HttpException";

class OrientationException extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}

export default OrientationException;
