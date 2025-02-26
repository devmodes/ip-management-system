import { controller } from "@controllers/index";
import {
  createIPAddress,
  deleteIPAddress,
  getIPAddress,
  getIPAddresses,
  updateIPAddress,
} from "@controllers/ip.controller";
import { auth } from "@middlewares/auth.middleware";
import { validate } from "@middlewares/validate.middleware";
import { createIPSchema } from "@schema/create-ip.schema";
import { Router } from "express";
import { IPAddressPolicy } from "src/policies/ip-address.policy";

const router: Router = Router();

router.post(
  "/",
  [auth, validate(createIPSchema)],
  controller(createIPAddress, IPAddressPolicy.canCreate)
);
router.get("/", auth, controller(getIPAddresses, IPAddressPolicy.canView));
router.get("/:id", auth, controller(getIPAddress, IPAddressPolicy.canView));

router.put("/:id", auth, controller(updateIPAddress));
router.delete(
  "/:id",
  auth,
  controller(deleteIPAddress, IPAddressPolicy.canDelete)
);

export default router;
