import { Response } from "express";
import { ExpressRequest } from "../domain/expressRequest.interface";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { Code } from "../enum/code.enum";
import { Status } from "../enum/status.enum";
import { HttpResponse } from "../domain/response";
import User from "../models/user.model";
import { IUser } from "../domain/user";
import { ErrorHandler } from "../utils/errorHandler";

// get all user => api/v1/user
export const getAllUsers = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        // get all active users
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

// send invitation => api/v1/user/send-invitation
export const sendInvitation = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        const { id }: IUser = req.body;
        // find current user
        const currentUser = await checkUserExists(req.user.id);

        // check invitation user exists
        await checkUserExists(id);

        // find invitation user and send invitation
        const user = await User.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    invitations: [currentUser?.id],
                },
            }
        );

        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Invitation Send Successfully",
                user
            )
        );
    }
);

// check user existence
export const checkUserExists = async (userId: string) => {
    // find user
    const user = await User.findById(userId);
    if (!user) {
        throw new ErrorHandler({
            statusCode: Code.NOT_FOUND,
            httpStatus: Status.NOT_FOUND,
            message: "User you are looking for does not exist!!!",
        });
    }

    return user;
};
