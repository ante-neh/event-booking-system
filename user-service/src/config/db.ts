import { Sequelize } from "sequelize-typescript";
import { config } from "./dbConfig";

const env =
  ((process.env.NODE_ENV || "development") as "development") ||
  "test" ||
  "production";
const configFile = config[env];
const sequelize: Sequelize = new Sequelize({
  username: configFile.username,
  password: configFile.password,
  database: configFile.database,
  host: configFile.host,
  dialect: "postgres",
  pool: {
    min: 10,
    max: 30,
    idle: 20000,
    acquire: 60000,
  },
  retry: {
    max: 5,
  },
  models: [],
  logging: false,
});

export { sequelize };
