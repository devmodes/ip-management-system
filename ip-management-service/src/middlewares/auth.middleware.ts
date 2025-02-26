import { isAuthorized } from "@services/auth.service";
import { UnauthorizedException } from "@utils/exceptions";
import { NextFunction, Request, Response } from "express";
import { User } from "src/types/User";

type ResponseData = {
  data: {
    user: User;
    permissions: string[];
    roles: string[];
  };
};

export const auth = async (req: Request, _: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    isAuthorized(token)
      .then((res: any) => res.data)
      .then((data: ResponseData["data"]) => {
        const { user, permissions, roles } = data;
        console.log(user);
        req.user = {
          ...user,
          permissions,
          roles,
        };

        next();
      })
      .catch(() => next(new UnauthorizedException()));
  } catch (error) {
    next(new UnauthorizedException());
  }
};
