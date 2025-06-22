import { Request } from "express";

class BadRequestError extends Error{
    constructor(message: string){
        super(message)
    }
}

class NotFoundError extends Error{
    constructor(message: string){
        super(message)
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


interface IAuthRequest extends Request{
     user?: {
            id: string;
            email: string;
            role: string;
        }
}
export {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
    ForbiddenError,
    IAuthRequest
}