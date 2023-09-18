import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import { IUser } from "../domain/user";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import User from "../models/user.model";
import { Code } from "../enum/code.enum";
import { HttpResponse } from "../domain/response";
import { Status } from "../enum/status.enum";
import { randomId } from "../utils/randomId";
import { sendToken } from "../utils/jwtToken";
import { ExpressRequest } from "../domain/expressRequest.interface";
import { checkUserExistsById } from "./user.controller";
import { sendEmail } from "../utils/sendEmail";
import { ErrorHandler } from "../utils/errorHandler";
import { resetPasswordTemplate } from "../templates/resetPasswordTemplate";
import { OAuth2Client } from "google-auth-library";
const cloudinary = require("cloudinary");
import jwtDecode from "jwt-decode";

const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "postmessage"
);

// register user => api/v1/auth/register
export const registerUser = catchAsyncErrors(
    async (req: Request, res: Response) => {
        const { firstName, lastName, password, email }: IUser = req.body;

        // create new user
        const user = await User.create({
            firstName,
            lastName,
            userIdentifier: randomId(10),
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

        sendToken(user, Code.OK, res);
    }
);

// forgot password => api/v1/auth/password/forgot
export const forgotPassword = catchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await User.findOne({ email: req.body.email });

        // Checks if email and password is entered by user
        if (!user) {
            return res.send(
                new HttpResponse(
                    Code.BAD_REQUEST,
                    Status.BAD_REQUEST,
                    "User not found with this email"
                )
            );
        }

        // Get reset token
        const resetToken = user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false });

        // Create reset password url
        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

        //reset password template
        const emailTemplate = resetPasswordTemplate(user.firstName, resetUrl);

        try {
            await sendEmail({
                email: user.email,
                subject: "Genius Password Recovery",
                message: emailTemplate.message,
            });

            res.send(
                new HttpResponse(
                    Code.OK,
                    Status.OK,
                    `Email sent to: ${user.email}`
                )
            );
        } catch (error: any) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({ validateBeforeSave: false });

            return next(
                new ErrorHandler({
                    statusCode: Code.BAD_REQUEST,
                    httpStatus: Status.BAD_REQUEST,
                    message: error.message,
                })
            );
        }
    }
);

// reset password => api/v1/auth/password/reset/:token
export const resetPassword = catchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
        // Hash URL token
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return next(
                new ErrorHandler({
                    statusCode: Code.BAD_REQUEST,
                    httpStatus: Status.BAD_REQUEST,
                    message:
                        "Password reset token is invalid or has been expired",
                })
            );
        }

        if (req.body.password !== req.body.confirmPassword) {
            return next(
                new ErrorHandler({
                    statusCode: Code.BAD_REQUEST,
                    httpStatus: Status.BAD_REQUEST,
                    message: "Password does not match",
                })
            );
        }

        // Setup new password
        user.password = req.body.password;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK, "Reset Password Successfully")
        );
    }
);

// get currently authenticated user
export const googleLogin = catchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
        const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens

        const token = tokens.id_token as string;
        const ticket: dataCredential = jwtDecode(token);

        const user = await User.findOne({
            email: ticket.email,
        });

        if (user) {
            sendToken(user, Code.OK, res);
        } else {
            // upload new user photo to cloudinary
            const result = await cloudinary.v2.uploader.upload(ticket.picture, {
                folder: "genius/avatar",
                width: 150,
                crop: "scale",
            });
            const newUser = await User.create({
                email: ticket.email,
                firstName: ticket.given_name,
                lastName: ticket.family_name,
                userIdentifier: randomId(10),
                username: ticket.given_name.toLowerCase() + randomId(4),
                password: randomId(12),
                photo: {
                    public_id: result.public_id,
                    url: result.secure_url,
                },
            });
            sendToken(newUser, Code.OK, res);
        }
    }
);

// get currently authenticated user
export const loggedInUser = catchAsyncErrors(
    async (req: ExpressRequest, res: Response, next: NextFunction) => {
        // find user by userId
        const user = await checkUserExistsById(req.user.id);

        res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK, "Get User Successfully", user)
        );
    }
);

// get currently authenticated user
export const logout = catchAsyncErrors(
    async (req: ExpressRequest, res: Response, next: NextFunction) => {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });

        res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK, "Logout Successfully")
        );
    }
);

export type dataCredential = {
    aud: string;
    azp: string;
    email: string;
    email_verified: boolean;
    exp: number;
    family_name: string;
    given_name: string;
    iss: string;
    jti: string;
    name: string;
    nbf: number;
    picture: string;
    sub: string;
};
