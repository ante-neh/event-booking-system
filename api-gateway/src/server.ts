import { createServer } from 'http';
import { app } from './app';
import { config } from './config/env';
import { logger } from './utils/logger.util';


const start = async()=>{
    const server = createServer(app);
    server.listen(config.PORT, ()=>{
        logger.info("Server is running on:", { PORT: config.PORT });
        logger.info("Auth service is runnig on:", { PORT: config.AUTH_SERVICE_URL})
        logger.info("Admin service is runnig on:", { PORT: config.ADMIN_SERVICE_URL})
        logger.info("Booking service is runnig on:", { PORT: config.BOOKING_SERVICE_URL})
        logger.info("Event service is runnig on:", { PORT: config.EVENT_SERVICE_URL})
        logger.info("Notification service is runnig on:", { PORT: config.NOTIFICATION_SERVICE_URL})
        logger.info("Payment service is runnig on:", { PORT: config.PAYMENT_SERVICE_URL})
        logger.info("User service is runnig on:", { PORT: config.USER_SERVICE_URL})
    })
};

start();