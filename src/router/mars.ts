import { Router } from "express";
import asyncHandler from "express-async-handler";

import { Mars } from "../handlers/mars";
import { ValidateMarsInstructionsBody } from "../utils/validators";
import { MarsMiddleware } from "../middleware/mars.middleware";

const router = Router();

router.post(
  "/instructions",
  ValidateMarsInstructionsBody,
  asyncHandler(MarsMiddleware), // to do a preValidation
  asyncHandler(Mars), // main logic
);

export default router;
