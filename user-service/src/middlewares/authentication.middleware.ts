import { Response, NextFunction } from "express";
import { AuthenticatedRequest, BadRequestError, Role } from "../types";
import { logger } from "../utils/logger";

const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.headers["x-user-id"]) {
    req.user = req.user || ({} as { id: string; role: Role });
    const id = req.headers["x-user-id"] as string | undefined;
    const role = req.headers["x-user-role"] as Role | undefined;
    if (!id || !role) {
      logger.warn("Unauthenticated request", {
        method: req.method,
        url: req.originalUrl,
      });
      return next(new BadRequestError("unauthenticated"));
    }

    req.user.id = id;
    if (role) req.user.role = role;
    next();
  } else {
    logger.warn("Unauthenticated request", {
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
    });
    next(new BadRequestError("unauthenticated"));
  }
};

export { authenticate };
