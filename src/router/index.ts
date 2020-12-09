import { Router } from "express";

import cors from "cors";

import meta from "./meta";
import mars from "./mars";

const router = Router();

// middlewares
router.use(cors({ credentials: true, origin: true }));

// routes
router.use("/meta", meta);
router.use("/mars", mars);

export default router as Router;
