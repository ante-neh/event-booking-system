import dotenv from 'dotenv'
import path from 'path' 
import { AppConfig } from '../types';
import { getEnv } from '../utils';

dotenv.config({path: path.resolve(process.cwd(), '.env')});

const config: AppConfig = {
    PORT: getEnv("PORT"),
    NODE_ENV: getEnv("NODE_ENV"),
}

export { config }