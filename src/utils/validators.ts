import { body } from "express-validator";

export const ValidateMarsInstructionsBody = [
  body("instructions")
    .exists()
    .withMessage("Hey buddy, forgot to give me the intructions?")
    .isString()
    .withMessage("instructions must come as a string only")
    .isLength({ max: 100 })
    .withMessage("instructions must not be more than 100 chars long"),
];
