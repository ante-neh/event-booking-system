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
  NODE_ENV: Environment;
  development: DBConfig;
  test: DBConfig;
  production: DBConfig;
}

export { 
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    Environment,
    AppConfig
}