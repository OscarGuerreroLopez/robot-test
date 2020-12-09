import { Router } from "express";

import cors from "cors";

import meta from "./meta";

const router = Router();

// middlewares
router.use(cors({ credentials: true, origin: true }));

// routes
router.use("/meta", meta);

export default router as Router;
