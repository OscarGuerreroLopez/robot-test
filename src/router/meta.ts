import { Router } from "express";
import { GetMeta } from "../handlers/meta";

const router = Router();

router.get("/", GetMeta);

export default router;
