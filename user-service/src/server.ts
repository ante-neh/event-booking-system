import { createServer } from "http";
import { sequelize } from "./config/db";
import { logger } from "./utils/logger";
import { app } from "./app";
import { config } from "./config/env";

const start = async () => {
  sequelize
    .authenticate()
    .then(() => logger.info("Database connected successfully"))
    .catch((err: any) =>
      logger.error("Faild to connect to database", {
        message: err.message,
      })
    );
  const server = createServer(app);

  server.listen(config.PORT, () =>
    logger.info("Server is running on port: ", {
      port: config.PORT,
    })
  );
};

start();
