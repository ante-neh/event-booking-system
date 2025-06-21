import mongoose from 'mongoose';
import { config } from './env';
import { logger } from '../utils/logger.utils';

const connectToDb = async()=>{
    try{
        const conn = await mongoose.connect(config.DB_URL)
        logger.info(`MongoDB connected: ${conn.connection.host}`);
    }catch(err){
        logger.error("Failed to connect to database", err);
    }
}

export { connectToDb };