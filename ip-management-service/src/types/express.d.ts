import express from "express";
import { User } from "./User";

declare module "express" {
  export interface Request {
    user?: User;
  }
}
