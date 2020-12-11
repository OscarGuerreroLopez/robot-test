import { Router } from "express";
import asyncHandler from "express-async-handler";

import { Mars } from "../handlers/mars";
import { GetLost } from "../handlers/lost";
import { ValidateMarsInstructionsBody } from "../utils/validators";
import { MarsMiddleware } from "../middleware/mars.middleware";

const router = Router();

router.post(
  "/instructions",
  ValidateMarsInstructionsBody,
  asyncHandler(MarsMiddleware), // to do a preValidation
  asyncHandler(Mars), // main logic
);

router.get("/lost", asyncHandler(GetLost));

export default router;
