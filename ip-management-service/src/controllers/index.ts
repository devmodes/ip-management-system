import { NextFunction, Request, Response } from "express";
import { HttpException, InternalServerException } from "@utils/exceptions";

export const controller = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let exception = error;

      if (error instanceof HttpException) {
        exception = error;
      } else {
        exception = new InternalServerException(null);
      }

      next(exception);
    }
  };
};
