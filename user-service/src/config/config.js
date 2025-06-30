import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const config= {
  development: {
    username: process.env.DEVELOPMENT_PG_USER,
    password: process.env.DEVELOPMENT_PG_PASSWORD,
    database: process.env.DEVELOPMENT_PG_DATABASE,
    host: process.env.DEVELOPMENT_PG_HOST,
    dialect: "postgres",
  },
  test: {
    username: process.env.TEST_PG_USER,
    password: process.env.TEST_PG_PASSWORD,
    database: process.env.TEST_PG_DATABASE,
    host: process.env.TEST_PG_HOST,
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: false,
    },
  },
  production: {
    username: process.env.PRODUCTION_PG_USER ,
    password: process.env.PRODUCTION_PG_PASSWORD,
    database: process.env.PRODUCTION_PG_DATABASE,
    host: process.env.PRODUCTION_PG_HOST,
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


export default config;