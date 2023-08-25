import { Request, Response } from "express";
import { IUser } from "../domain/user";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import User from "../models/user.model";
import { Code } from "../enum/code.enum";
import { HttpResponse } from "../domain/response";
import { Status } from "../enum/status.enum";
import { randomId } from "../utils/randomId";

// register user => api/v1/auth
export const registerUser = catchAsyncErrors(
    async (req: Request, res: Response) => {
        const { firstName, lastName, password, email }: IUser = req.body;

        // create new user
        const user = await User.create({
            firstName,
            lastName,
            username: firstName.toLowerCase() + randomId(4),
            email,
            password,
        });

        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "User Register Successfully",
                user
            )
        );
    }
);
