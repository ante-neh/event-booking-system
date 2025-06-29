import dotenv from "dotenv";
import path from "path";
import { AppConfig, Environment } from "../types";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const getEnv = (key: string, required = true): string => {
  const value = process.env[key];
  if (required && !value) {
    throw new Error(`Environment variable ${key} is required but not set.`);
  }
  return value as string;
};

const config: AppConfig = {
  PORT: getEnv("PORT"),
  NODE_ENV: getEnv("NODE_ENV") as Environment,
  ACCESS_TOKEN_SECRET:getEnv("REFRESH_TOKEN_SECRET"), 
  REFRESH_TOKEN_SECRET: getEnv("REFRESH_TOKEN_SECRET"),
  ACCESS_TOKEN_EXPIRES_IN: getEnv("ACCESS_TOKEN_EXPIRES_IN"),
  REFRESH_TOKEN_EXPIRES_IN: getEnv("REFRESH_TOKEN_EXPIRES_IN"),
};


export { config, getEnv }