import moment from "moment";

import { RedisClient } from "../utils/redis";
import { Logger } from "../utils/winstonLogger";

export const NewLost = async (location: string): Promise<void> => {
  const endOfDay: any = moment().endOf("day").valueOf();
  console.log(location, endOfDay);

  RedisClient.lrange("lostRobots", 0, -1, (err: any, data: any) => {
    if (err) {
      Logger.warn("There has been a problem setting lost robots to redis", {
        identifier: "lostRobots",
        err,
      });
    }

    if (data.length === 0) {
      RedisClient.rpush("lostRobots", location);
      RedisClient.expireat("lostRobots", endOfDay);
    } else {
      RedisClient.rpush("lostRobots", location);
    }
  });
};

export const Lost = async (): Promise<{
  count: string;
  data: IObjectLiteral;
}> => {
  return new Promise((resolve, reject) => {
    RedisClient.lrange("lostRobots", 0, -1, (err: any, data: any) => {
      if (err) {
        reject(err);
      }

      const count = data?.length || 0;
      const groupedData = data.reduce(
        (r: { [key: string]: any }, e: string | number) => {
          r[e] = (r[e] || 0) + 1;
          return r;
        },
        {},
      );
      resolve({ count: `You have lost ${count} today`, data: groupedData });
    });
  });
};
