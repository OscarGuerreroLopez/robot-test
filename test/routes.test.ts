import { mockReq, mockRes } from "sinon-express-mock";

import { version as __version } from "../package.json";
import { GetMeta } from "../src/handlers/meta";
import { Mars } from "../src/handlers/mars";
import { EnvVars } from "../src/utils/validateEnv";
import { Grid } from "../src/mars/grid";

import HttpException from "../src/exceptions/HttpException";

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ META @@@@@@@@@@@@@@@@@@@@@@@@@@@@@
describe("meta", () => {
  const next = () => null;
  let request: ReturnType<typeof mockReq>;
  let response: ReturnType<typeof mockRes>;
  let body: any;

  beforeEach(() => {
    request = mockReq();
    response = mockRes({
      send: (data: any) => {
        body = data;
      },
      status: (data: any) => {
        status = data;
        return response;
      },
    });
  });

  describe("getMeta()", () => {
    it("should send meta", async () => {
      await GetMeta(request, response, next);
      expect(body).toBeDefined();
      expect(body.version).toBe(__version);
      expect(body.env).toBe(EnvVars.NODE_ENV);
    });
  });
});

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ MARS @@@@@@@@@@@@@@@@@@@@@@@@@@@@@

describe("Post Mars Instructions", () => {
  const next = () => null;
  let request: ReturnType<typeof mockReq>;
  let response: ReturnType<typeof mockRes>;
  let body: any;
  let status: any;

  beforeEach(() => {
    request = mockReq({
      instructions: [
        "5 3",
        "1 1 E",
        "RFRFRFRF",
        "",
        "3 2 N",
        "FRRFLLFFRRFLL",
        "",
        "0 3 W",
        "LLFFFLFLFL",
      ],
    });
    response = mockRes({
      send: (data: any) => (body = data),
      status: (data: any) => {
        status = data;
        return response;
      },
    });
  });

  it("Should return the right final positions", async () => {
    // injecting the grid size since we are not going through the middleware
    Grid().setGrid(5, 3);
    await Mars(request, response, next);

    expect(status).toBe(200);
    expect(body).toBeDefined();
    expect(body.output).toBeDefined();
    expect(body.output).toBe("1 1 E\n3 3 N LOST\n2 3 S");
  });
});

describe("Post Mars Instructions fail", () => {
  const next = () => null;
  let request: ReturnType<typeof mockReq>;
  let response: ReturnType<typeof mockRes>;

  beforeEach(() => {
    request = mockReq({
      instructions: [
        "5 3",
        "1 1 X",
        "RFRFRFRF",
        "",
        "3 2 N",
        "FRRFLLFFRRFLL",
        "",
        "0 3 W",
        "LLFFFLFLFL",
      ],
    });
    response = mockRes();
  });

  it("Should throw an error", async () => {
    try {
      await Mars(request, response, next);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(400);
      expect(error.message).toBe(
        "Orientation X not valid, please check the request",
      );
    }
  });
});
