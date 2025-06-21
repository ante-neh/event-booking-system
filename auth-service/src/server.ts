import { createServer } from "http";
import { app } from "./app";
import { config } from "./config/env";
import { logger } from "./utils/logger.utils";
import { connectToDb } from "./config/db";


const startServer = async () => {
    try{
        await connectToDb();
        const server = createServer(app);
        server.listen(config.PORT, () => {
            logger.info(`Auth service running on port ${config.PORT}`);
        });
    }catch(err){
        logger.error("Error starting server:", err);
        process.exit(1);
    }
}

startServer();