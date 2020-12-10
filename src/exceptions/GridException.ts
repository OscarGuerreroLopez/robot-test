import HttpException from "./HttpException";

class GridException extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}

export default GridException;
