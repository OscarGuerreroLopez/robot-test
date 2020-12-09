import { Router } from "express";
import asyncHandler from "express-async-handler";

import { Mars } from "../handlers/mars";

const router = Router();

router.post(
  "/instructions",

  asyncHandler(Mars), // main logic
);

export default router;
