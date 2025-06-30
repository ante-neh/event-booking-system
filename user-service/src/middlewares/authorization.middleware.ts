import { Response, NextFunction } from "express";
import { AuthenticatedRequest, ForbiddenError, Role, UnauthorizedError } from "../types"; 

const authorize = (allowedRoles: Role[])=>(req: AuthenticatedRequest, res: Response, next: NextFunction)=>{
    const { role } = req.user || { role: 'attendee'};
    if(!role){
        return next(new UnauthorizedError(''))
    }

    if(!allowedRoles.includes(role)){
        return next(new ForbiddenError("Forbidden: Access denied."))
    }
    next();
}

export { authorize };