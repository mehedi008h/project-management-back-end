import { Request, Response, NextFunction } from "express";

export const catchAsyncErrors =
    (func: any) => (req: Request, res: Response, next: NextFunction) =>
        Promise.resolve(func(req, res, next)).catch(next);
