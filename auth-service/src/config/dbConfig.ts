import dotenv from 'dotenv';
import path from 'path';
import { DBConfig } from '../types';

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const config: {
    development: DBConfig,
    test: DBConfig,
    production: DBConfig
} = {
  development: {
    username: process.env.DEVELOPMENT_PG_USER as string,
    password: process.env.DEVELOPMENT_PG_PASSWORD as string,
    database: process.env.DEVELOPMENT_PG_DATABASE as string,
    host: process.env.DEVELOPMENT_PG_HOST as string,
    dialect: "postgres",
  },
  test: {
    username: process.env.TEST_PG_USER as string,
    password: process.env.TEST_PG_PASSWORD as string,
    database: process.env.TEST_PG_DATABASE as string,
    host: process.env.TEST_PG_HOST as string,
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: false,
    },
  },
  production: {
    username: process.env.PRODUCTION_PG_USER as string,
    password: process.env.PRODUCTION_PG_PASSWORD as string,
    database: process.env.PRODUCTION_PG_DATABASE as string,
    host: process.env.PRODUCTION_PG_HOST as string,
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


export { config };