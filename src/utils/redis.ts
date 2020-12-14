import * as redis from "redis";
import { EnvVars } from "./validateEnv";
import { Logger } from "../utils/winstonLogger";

export const RedisClient = redis.createClient({
  host: EnvVars.REDIS_HOST,
  port: EnvVars.REDIS_PORT,
  enable_offline_queue: false,
});

RedisClient.on("connect", () => {
  Logger.info("Redis client connected for Robot-test");
});

RedisClient.on("error", async (err: unknown) => {
  Logger.error("Error connecting to Redis from Robot-test", { data: err });
  await shutdownRedis();
  process.exit(1);
});

export const shutdownRedis = (): Promise<unknown> => {
  return new Promise((resolve) => {
    RedisClient.quit(() => {
      resolve();
    });
  });
};
