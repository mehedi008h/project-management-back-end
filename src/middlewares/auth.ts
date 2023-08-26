import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

import { ExpressRequest } from "../domain/expressRequest.interface";
import { HttpResponse } from "../domain/response";
import { Code } from "../enum/code.enum";
import { Status } from "../enum/status.enum";
import User from "../models/user.model";

export const isAuthenticatedUser = async (
    req: ExpressRequest,
    res: Response,
    next: NextFunction
) => {
    const { token } = req.cookies;

    if (!token) {
        return res.send(
            new HttpResponse(
                Code.BAD_REQUEST,
                Status.BAD_REQUEST,
                "Login first to access this resource!"
            )
        );
    }

    const decoded = verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await User.findById(decoded.id);

    req.user = user;
    next();
};
