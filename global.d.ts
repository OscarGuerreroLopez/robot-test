export {};

declare global {
  interface EnvObject {
    PORT: number;
    REDIS_PORT: number;
    REDIS_HOST: string;
    NODE_ENV: string;
  }

  interface IObjectLiteral {
    [key: string]: string;
  }

  interface Grid {
    addForbidden: (position: any) => void;
    hasForbidden: (position: any) => boolean;
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
