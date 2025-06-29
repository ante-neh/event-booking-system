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

export const config: AppConfig = {
  PORT: getEnv("PORT"),
  NODE_ENV: getEnv("NODE_ENV") as Environment,
  ACCESS_TOKEN_SECRET:getEnv("REFRESH_TOKEN_SECRET"), 
  REFRESH_TOKEN_SECRET: getEnv("REFRESH_TOKEN_SECRET"),
  ACCESS_TOKEN_EXPIRES_IN: getEnv("ACCESS_TOKEN_EXPIRES_IN"),
  REFRESH_TOKEN_EXPIRES_IN: getEnv("REFRESH_TOKEN_EXPIRES_IN"),
  development: {
    username: getEnv("DEVELOPMENT_PG_USER"),
    password: getEnv("DEVELOPMENT_PG_PASSWORD"),
    database: getEnv("DEVELOPMENT_PG_DATABASE"),
    host: getEnv("DEVELOPMENT_PG_HOST"),
    dialect: "postgres",
  },
  test: {
    username: getEnv("TEST_PG_USER", false),
    password: getEnv("TEST_PG_PASSWORD", false),
    database: getEnv("TEST_PG_DATABASE", false),
    host: getEnv("TEST_PG_HOST", false),
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: false,
    },
  },
  production: {
    username: getEnv("PRODUCTION_PG_USER", false),
    password: getEnv("PRODUCTION_PG_PASSWORD", false),
    database: getEnv("PRODUCTION_PG_DATABASE", false),
    host: getEnv("PRODUCTION_PG_HOST", false),
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
