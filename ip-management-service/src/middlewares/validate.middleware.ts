import { UnprocessableEntitiesException } from "@utils/exceptions";
import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        next(
          new UnprocessableEntitiesException("Invalid Data", error.flatten())
        );
      }

      next(error);
    }
  };
};
