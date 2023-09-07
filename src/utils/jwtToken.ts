import { Response } from "express";
import { IUser } from "../domain/user";
import { HttpResponse } from "../domain/response";
import { Code } from "../enum/code.enum";
import { Status } from "../enum/status.enum";

// Create and send token and save in the cookie.
export const sendToken = (user: IUser, statusCode: number, res: Response) => {
    // Create Jwt token
    const token = user.getSignedToken();

    // Options for cookie
    const options = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    res.status(statusCode)
        .cookie("token", token, options)
        .send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Signin Successfully",
                user,
                token
            )
        );
};
