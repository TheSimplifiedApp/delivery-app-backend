import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() })
    return
  }
  next()
}

export const validateMyUserRequest = [
  body('address').isString().notEmpty().withMessage('Address must be a string'),
  body('city').isString().notEmpty().withMessage('City must be a string'),
  body('country').isString().notEmpty().withMessage('Country must be a string'),
  handleValidationErrors
]