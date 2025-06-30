import { Request } from "express";

class BadRequestError extends Error{
    constructor(message: string){
        super(message);
    }
}

class NotFoundError extends Error{
    constructor(message: string){
        super(message);
    }
}

class UnauthorizedError extends Error{
    constructor(message: string){
        super(message);
    }
}

class ForbiddenError extends Error{
    constructor(message: string){
        super(message);
    }
}

interface AppConfig{
    PORT: string,
    NODE_ENV: string,
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

type Role = 'admin' | 'organizer' | 'attendee'

interface AuthenticatedRequest extends Request{
    user?:{
        id: string,
        role: Role
    }
}


export {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
    ForbiddenError,
    AppConfig,
    DBConfig,
    Role,
    AuthenticatedRequest
}