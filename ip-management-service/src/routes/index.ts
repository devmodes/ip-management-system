import { Router } from "express";
import ipRoutes from "./ip.routes";

const router: Router = Router();

router.use("/ip-addresses", ipRoutes);

export default router;
