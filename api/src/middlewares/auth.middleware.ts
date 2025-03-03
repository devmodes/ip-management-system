import axios from "axios";
import { NextFunction, Request, Response } from "express";

const AUTH_BASE_URL = "http://localhost:8000/api";

const isAuthorized = (token?: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${AUTH_BASE_URL}/me`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;

    // Make sure to not block the request for refresh tokens
    if (token && !req.path.includes("auth/refresh")) {
      isAuthorized(token)
        .then((res: any) => next())
        .catch(() => {
          return res.status(401).json({
            message: "Unauthorized!",
          });
        });
    } else {
      next();
    }
  } catch (error: any) {
    console.log(error);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
