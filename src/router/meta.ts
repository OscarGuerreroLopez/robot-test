import { Router } from "express";
import { getMeta } from "../handlers/meta";

const router = Router();

router.get("/", getMeta);

export default router;
