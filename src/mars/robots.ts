import { Position, MarsOrientationEnum, RobotInstructions } from "./position";
import OrientationException from "../exceptions/OrientationException";

const validOrientationValues: string[] = Object.values(MarsOrientationEnum);
const validRobotInstructions: string[] = Object.values(RobotInstructions);

interface RobotResponse {
  setPosition: (instruction: string) => void;
  move: (moves: string) => string;
}
export const Robot = (): RobotResponse => {
  const { position, moveProtocols } = Position();

  const setPosition = (instruction: string) => {
    const startPosition: string[] = instruction.split(" ");

    position.x = parseInt(startPosition[0]);
    position.y = parseInt(startPosition[1]);
    if (validOrientationValues.includes(startPosition[2])) {
      position.orientation = startPosition[2] as MarsOrientationType;
    } else {
      throw new OrientationException(
        `Orientation ${startPosition[2]} not valid, please check the request`,
      );
    }
  };

  const move = (moves: string) => {
    for (let i = 0; i < moves.length; i++) {
      const instruction = moves[i];

      if (position.lost) {
        break;
      }

      if (validRobotInstructions.includes(instruction)) {
        moveProtocols.get(instruction)!();
      } else {
        throw new OrientationException(
          `Instruction ${instruction} not valid, please check the request`,
        );
      }
    }

    return (
      position.x +
      " " +
      position.y +
      " " +
      position.orientation +
      (position.lost ? " LOST" : "")
    );
  };

  return { setPosition, move };
};
