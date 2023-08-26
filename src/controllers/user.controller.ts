import { Response } from "express";
import { ExpressRequest } from "../domain/expressRequest.interface";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { Code } from "../enum/code.enum";
import { Status } from "../enum/status.enum";
import { HttpResponse } from "../domain/response";
import User from "../models/user.model";

// get all user => api/v1/user
export const getAllUsers = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        const users = await User.find({
            active: true,
        });
        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Get all user Successfully",
                users
            )
        );
    }
);
