import dotenv from 'dotenv'
import path from 'path' 
import { AppConfig } from '../types';
import { getEnv } from '../utils';

dotenv.config({path: path.resolve(process.cwd(), '.env')});

const config: AppConfig = {
    PORT: getEnv("PORT"),
    NODE_ENV: getEnv("NODE_ENV"),
    ACCESS_TOKEN_SECRET: getEnv("ACCESS_TOKEN_SECRET")
}

export { config }