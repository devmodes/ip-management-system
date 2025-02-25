import { Router } from "express";
import ipRoutes from "./ip.routes";

const router: Router = Router();

router.use("", ipRoutes);

export default router;
