import { NextFunction, Request, Response } from "express";
import { Code } from "../enum/code.enum";
import { ErrorHandler } from "../utils/errorHandler";
import { Status } from "../enum/status.enum";
import { HttpResponse } from "../domain/response";

export const errorMiddleware = (
    err: ErrorHandler,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    err.statusCode = err.statusCode || 500;

    let error = { ...err };

    error.message = err.message;

    // Wrong Mongoose Object ID Error
    if (err.name === "CastError") {
        console.log(err);
        const message = `Resource not found. Invalid Path!!!`;
        error = new ErrorHandler({
            statusCode: Code.BAD_REQUEST,
            httpStatus: Status.BAD_REQUEST,
            message: message,
        });
    }

    // Handling wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = "JSON Web Token is invalid. Try Again!!!";
        error = new ErrorHandler({
            statusCode: Code.BAD_REQUEST,
            httpStatus: Status.BAD_REQUEST,
            message: message,
        });
    }

    // Handling Expired JWT error
    if (err.name === "TokenExpiredError") {
        const message = "JSON Web Token is expired. Try Again!!!";
        error = new ErrorHandler({
            statusCode: Code.BAD_REQUEST,
            httpStatus: Status.BAD_REQUEST,
            message: message,
        });
    }

    res.status(error.statusCode).send(
        new HttpResponse(
            error.statusCode,
            error.httpStatus,
            error.message || "Internal Server Error!!!"
        )
    );
};
