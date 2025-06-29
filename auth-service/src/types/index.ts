// import type { Options } from 'sequelize';
class BadRequestError extends Error {
    constructor(message: string){
        super(message);
    }
}

class UnauthorizedError extends Error {
    constructor(message: string){
        super(message);
    }
}

class ForbiddenError extends Error {
    constructor(message: string){
        super(message);
    }
}

class NotFoundError extends Error {
    constructor(message: string){
        super(message);
    }
}

interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: 'postgres';
  protocol?: string;
  dialectOptions?: any;
}

type Environment = 'development' | 'test' | 'production';
interface AppConfig {
  PORT: string;
  ACCESS_TOKEN_SECRET: string,
  REFRESH_TOKEN_SECRET: string,
  ACCESS_TOKEN_EXPIRES_IN: string,
  REFRESH_TOKEN_EXPIRES_IN: string
  NODE_ENV: Environment;
}

// interface SequelizeConfig {
//   [key: string]: Options;
// }

export { 
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    Environment,
    AppConfig,
    DBConfig
    // SequelizeConfig
}