import { Grid } from ".";

export enum MarsOrientationEnum {
  N = "N",
  S = "S",
  E = "E",
  W = "W",
}

export enum RobotInstructions {
  R = "R",
  F = "F",
  L = "L",
}

interface PositionResponse {
  position: GridPosition;
  moveProtocols: Map<string, () => void>;
}

export const Position = (): PositionResponse => {
  const right = { N: "E", E: "S", S: "W", W: "N" };
  const left = { N: "W", W: "S", S: "E", E: "N" };

  const { length, height, hasForbidden, addForbidden } = Grid();

  const position: GridPosition = {
    x: 0,
    y: 0,
    orientation: "N",
    lost: false,
  };

  const turnRight = () => {
    position.orientation = right[position.orientation] as MarsOrientationType;
  };

  const turnLeft = () => {
    position.orientation = left[position.orientation] as MarsOrientationType;
  };

  const moveForward = () => {
    if (
      !position.lost &&
      !hasForbidden(position.x + " " + position.y + " " + position.orientation)
    ) {
      if (position.orientation === MarsOrientationEnum.N) {
        position.y++;
      }
      if (position.orientation === MarsOrientationEnum.E) {
        position.x++;
      }
      if (position.orientation === MarsOrientationEnum.S) {
        position.y--;
      }
      if (position.orientation === MarsOrientationEnum.W) {
        position.x--;
      }

      const lastPosition =
        position.x + " " + position.y + " " + position.orientation;

      if (position.x > length) {
        position.x = length;
        position.lost = true;
      }

      if (position.y > height) {
        position.y = height;
        position.lost = true;
      }

      if (position.y < 0) {
        position.y = 0;
        position.lost = true;
      }

      if (position.x < 0) {
        position.x = 0;
        position.lost = true;
      }

      if (position.lost) {
        addForbidden(
          position.x + " " + position.y + " " + position.orientation,
          lastPosition,
        );
      }
    }
  };

  // Creating an array of functions in case we want to extend
  // in the future, we just need to create the new function and add it
  // We would just need to change this file and the globals
  const moveProtocols: Map<string, () => void> = new Map();

  moveProtocols.set(RobotInstructions.R, turnRight);
  moveProtocols.set(RobotInstructions.L, turnLeft);
  moveProtocols.set(RobotInstructions.F, moveForward);

  return { position, moveProtocols };
};
