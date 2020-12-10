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

RedisClient.on("error", (err: any) => {
  Logger.error("Error connecting to Redis from Robot-test", { data: err });
  process.exit(1);
});
