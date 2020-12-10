import GridException from "../exceptions/GridException";

let forbidden: string[] = [];
let length: number;
let height: number;

export const Grid = (): Grid => {
  const addForbidden = (position: string) => {
    forbidden.push(position);
  };

  const hasForbidden = (position: string) => {
    return forbidden.indexOf(position) > -1;
  };

  const setGrid = (gridLength: number, gridHeight: number) => {
    if (gridLength > 50 || gridHeight > 50) {
      throw new GridException("The grid cannot be greater than 50x50");
    }

    if (gridLength < 0 || gridHeight < 0) {
      throw new GridException("The grid cannot be smaller than 1x1");
    }

    forbidden = [];
    length = gridLength;
    height = gridHeight;
  };

  return { addForbidden, hasForbidden, length, height, setGrid };
};
