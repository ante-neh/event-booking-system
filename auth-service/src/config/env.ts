import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") }); 

const getEnv = (key: string, required = true): string => {
    const value = process.env[key] as string;;
    if (required && !value) {
        throw new Error(`Environment variable ${key} is required but not set.`);
    }
    return value;
}

export const config = {
    PORT: getEnv("PORT"),
    NODE_ENV: getEnv("NODE_ENV"),
    DB_URL: getEnv("DB_URL"),
}