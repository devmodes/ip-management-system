import { HttpException } from "@utils/exceptions";
import { NextFunction, Request, Response } from "express";

export const errorsMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(error.status).json({
    message: error.message,
    errors: error.errors,
  });
};
