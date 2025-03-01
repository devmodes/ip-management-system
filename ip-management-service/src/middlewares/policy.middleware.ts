import {
  InternalServerException,
  UnauthorizedException,
} from "@utils/exceptions";
import { NextFunction, Request, Response } from "express";
import { User } from "src/types/User";

export const policy = (permissionCheck: (user: User) => boolean) => {
  return (req: Request, _: Response, next: NextFunction) => {
    try {
      if (req.user && !permissionCheck(req.user)) {
        throw new UnauthorizedException();
      }

      next();
    } catch (error: any) {
      next(
        new InternalServerException(
          "Something went wrong in the Policy Middleware!"
        )
      );
    }
  };
};
