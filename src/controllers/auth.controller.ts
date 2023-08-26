import { NextFunction, Request, Response } from "express";
import { IUser } from "../domain/user";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import User from "../models/user.model";
import { Code } from "../enum/code.enum";
import { HttpResponse } from "../domain/response";
import { Status } from "../enum/status.enum";
import { randomId } from "../utils/randomId";
import { sendToken } from "../utils/jwtToken";
import { ExpressRequest } from "../domain/expressRequest.interface";
import { checkUserExists } from "./user.controller";

// register user => api/v1/auth/register
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

// login user => api/v1/auth/login
export const loginUser = catchAsyncErrors(
    async (req: Request, res: Response) => {
        const { email, password }: IUser = req.body;

        // Checks if email and password is entered by user
        if (!email || !password) {
            return res.send(
                new HttpResponse(
                    Code.BAD_REQUEST,
                    Status.BAD_REQUEST,
                    "Invalid Email or Password"
                )
            );
        }

        // Finding user in database
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.send(
                new HttpResponse(
                    Code.BAD_REQUEST,
                    Status.BAD_REQUEST,
                    "Invalid Email, User does not exist!!!"
                )
            );
        }

        // Checks if password is correct or not
        const isPasswordMatched = await user.matchPassword(password);

        if (!isPasswordMatched) {
            return res.send(
                new HttpResponse(
                    Code.BAD_REQUEST,
                    Status.BAD_REQUEST,
                    "Invalid Password"
                )
            );
        }

        sendToken(user, 200, res);
    }
);

// get currently authenticated user
export const loggedInUser = catchAsyncErrors(
    async (req: ExpressRequest, res: Response, next: NextFunction) => {
        // find user by userId
        const user = await checkUserExists(req.user.id);

        res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK, "Get User Successfully", user)
        );
    }
);
