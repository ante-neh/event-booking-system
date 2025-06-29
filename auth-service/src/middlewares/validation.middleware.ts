import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { logger } from "../utils/logger.utils";

const validationMiddleware =
  (schema: ZodSchema, validationType: "body" | "query" | "params") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req[validationType]);
      if (!result.success) {
        const errors = result.error.errors.map((err: any) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        res.status(400).json({
          success: false,
          message: "Validation faild",
          errors,
        });
      }
      req[validationType] = result.data;
      next();
    } catch (error: any) {
      logger.error("Validation faild", {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        message: error.message,
      });
      next(error);
    }
  };

export { validationMiddleware };