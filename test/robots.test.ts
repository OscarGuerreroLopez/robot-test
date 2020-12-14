/* eslint-disable @typescript-eslint/no-explicit-any */
import { Robot } from "../src/mars/robots";
import { Grid } from "../src/mars/grid";
import OrientationException from "../src/exceptions/OrientationException";
import { shutdownRedis } from "../src/utils/redis";

jest.mock("../src/mars/lostRobots", () => {
  const NewLost = async (location: string): Promise<void> => {
    console.log(location);
  };
  const Lost = async (): Promise<{
    count: string;
    data: any;
  }> => {
    return new Promise((resolve) => {
      resolve({ count: `You have lost 9 today`, data: {} });
    });
  };
  return {
    NewLost,
    Lost,
  };
});

describe("Testing Robot", () => {
  afterAll(async (done) => {
    await shutdownRedis();
    done();
  });

  it("Should return true", () => {
    expect(true).toBe(true);
  });

  it("Should return the right move", async () => {
    Grid().setGrid(5, 3);
    const robot = Robot();

    const moves = "RFRFRFRF";

    const result = "1 1 E";
    robot.setPosition("1 1 E");

    const callRobot = robot.move(moves);

    expect(callRobot).toBe(result);
  });

  it("should throw an error", () => {
    try {
      const robot = Robot();
      robot.setPosition("1 1 X");
    } catch (error) {
      expect(error).toBeInstanceOf(OrientationException);
      expect(error.message).toBe(
        "Orientation X not valid, please check the request",
      );
    }
  });

  it("should return a lost robot", () => {
    Grid().setGrid(5, 3);
    const robot = Robot();

    const moves = "FRRFLLFFRRFLL";

    const result = "3 3 N LOST";
    robot.setPosition("3 2 N");

    const callRobot = robot.move(moves);

    expect(callRobot).toBe(result);
  });
});
