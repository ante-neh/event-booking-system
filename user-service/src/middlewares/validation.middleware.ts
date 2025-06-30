import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { logger } from "../utils/logger";

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
          status: false,
          message: "Validation faild",
          errors,
        });
      }

      req[validationType] = result.data;
      next();
    } catch (error: any) {
      logger.error("validation error", {
        message: error.message,
        status: 400,
        method: req.method,
        validationType,
        url: req.url,
      });
      next(error);
    }
  };

export { validationMiddleware };
