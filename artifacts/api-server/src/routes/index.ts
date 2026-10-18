import { Router, type IRouter } from "express";
import carsRouter from "./cars";
import healthRouter from "./health";

const router: IRouter = Router();

router.use(healthRouter);
router.use(carsRouter);

export default router;
