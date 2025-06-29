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
  development: DBConfig;
  test: DBConfig;
  production: DBConfig;
}

interface IUser{
    id?: string,
    email: string,
    password: string,
    role: string
}

interface IRefreshToken{
    id?: string,
    user_id: string,
    token: string,
    revoked: boolean,
}

export { 
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    Environment,
    AppConfig,
    IUser,
    IRefreshToken
}