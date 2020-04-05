import { NextFunction, Request, Response } from "express";
import { Exception } from "./exception";

export const exceptionHandler = (err: Exception, req: Request, res: Response, _next: NextFunction) => {
  return res
    .status(err.code)
    .json({
      success: false,
      message: err.message,
      payload: req.body
    })
};
