export {};

declare global {
  interface EnvObject {
    PORT: number;
    REDIS_PORT: number;
    REDIS_HOST: string;
    NODE_ENV: string;
  }

  interface IObjectLiteral {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  interface Grid {
    addForbidden: (position: string, lastPosition: string) => void;
    hasForbidden: (position: string) => boolean;
    setGrid: (length: number, height: number) => void;
    length: number;
    height: number;
  }
  type MarsOrientationType = "N" | "S" | "E" | "W";
  interface GridPosition {
    x: number;
    y: number;
    orientation: MarsOrientationType;
    lost: boolean;
  }
}
