import { SuccessResult } from "@utils/success";
import { NextFunction, Request, Response } from "express";

export const successMiddleware = <T>(
  success: SuccessResult<T>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (success instanceof SuccessResult) {
    return res.status(success.code).json({
      message: success.message,
      data: success.data,
    });
  }

  next(success);
};
