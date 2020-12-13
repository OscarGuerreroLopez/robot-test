import moment from "moment";

import { RedisClient } from "../utils/redis";
import { Logger } from "../utils/winstonLogger";

export const NewLost = async (location: string): Promise<void> => {
  const endOfDay: number = moment().endOf("day").valueOf();

  RedisClient.lrange("lostRobots", 0, -1, (err: unknown, data: string[]) => {
    if (err) {
      Logger.warn("There has been a problem setting lost robots to redis", {
        identifier: "lostRobots",
        err,
      });
    } else {
      if (data.length === 0) {
        RedisClient.rpush("lostRobots", location);
        RedisClient.expireat("lostRobots", endOfDay);
      } else {
        RedisClient.rpush("lostRobots", location);
      }
    }
  });
};

export const Lost = async (): Promise<{
  count: string;
  data: IObjectLiteral;
}> => {
  return new Promise((resolve, reject) => {
    RedisClient.lrange("lostRobots", 0, -1, (err: unknown, data: string[]) => {
      if (err) {
        reject(err);
      } else {
        const count = data?.length || 0;
        const groupedData = data.reduce(
          (result: IObjectLiteral, element: string | number) => {
            result[element] = (result[element] || 0) + 1;
            return result;
          },
          {},
        );
        resolve({ count: `You have lost ${count} today`, data: groupedData });
      }
    });
  });
};
