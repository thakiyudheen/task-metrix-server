import { Request, Response, NextFunction } from "express";
import { CustomError } from "./customError"; 

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({ error: err.message });
  }

 
  console.error("Unexpected error:", err);
  res.status(500).json({ error: "Internal server error" });
};
