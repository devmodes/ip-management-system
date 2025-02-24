import { controller } from "@controllers/index";
import {
  createIPAddress,
  deleteIPAddress,
  getIPAddress,
  getIPAddresses,
  updateIPAddress,
} from "@controllers/ip.controller";
import { Router } from "express";

const router: Router = Router();

router.post("/", controller(createIPAddress));
router.get("/", controller(getIPAddresses));
router.get("/:id", controller(getIPAddress));
router.put("/:id", controller(updateIPAddress));
router.delete("/:id", controller(deleteIPAddress));

export default router;
