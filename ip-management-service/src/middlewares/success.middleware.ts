import { SuccessResult } from "@utils/success";
import { NextFunction, Request, Response } from "express";

export const successMiddleware = <T>(
  result: SuccessResult<T>,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (result instanceof SuccessResult) {
    return res.status(result.code).json({
      message: result.message,
      data: result.data,
    });
  }

  next(result);
};
