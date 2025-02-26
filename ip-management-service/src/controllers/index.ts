import { NextFunction, Request, Response } from "express";
import {
  HttpException,
  InternalServerException,
  UnauthorizedException,
} from "@utils/exceptions";
import { User } from "src/types/User";

export const controller = (
  method: Function,
  policy?: (user: User) => boolean
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.user && !policy?.(req.user)) {
        throw new UnauthorizedException();
      }

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
