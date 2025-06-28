import { createServer } from "http";
import { app } from "./app";
import { config } from "./config/env";
import { logger } from "./utils/logger.utils";
import { sequelize } from "./config/db";

const startServer = async () => {
  try {
    sequelize
      .authenticate()
      .then(() => {
        logger.info("Database connected successfully");
      })
      .catch((err) => {
        logger.error("Faild to connect to database", { err });
      });
    const server = createServer(app);
    server.listen(config.PORT, () => {
      logger.info(`Auth service running on port ${config.PORT}`);
    });
  } catch (err) {
    logger.error("Error starting server:", err);
    process.exit(1);
  }
};

startServer();
