import { Response } from "express";
import { ExpressRequest } from "../domain/expressRequest.interface";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { Code } from "../enum/code.enum";
import { Status } from "../enum/status.enum";
import { HttpResponse } from "../domain/response";
import User from "../models/user.model";
import { IUser } from "../domain/user";
import { ErrorHandler } from "../utils/errorHandler";
import { request } from "http";

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
                $addToSet: {
                    invitations: [currentUser.id],
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

// get all invitations => api/v1/user/invitation
export const getAllInvitation = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        // find current user
        const currentUser = await checkUserExists(req.user.id);

        // find all invitations of current user
        const users = await User.find({
            _id: currentUser.invitations,
        });

        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Get All Invitation Successfully",
                users
            )
        );
    }
);

// check invitation send or not => api/v1/user/check-invitation/id
export const checkSendInvitation = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        const { id } = req.params;
        // find current user
        const currentUser = await checkUserExists(req.user.id);

        // check invitation user exists
        const existUser = await checkUserExists(id);

        // check invitation send or not
        const user = currentUser.invitations.includes(existUser.id);

        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Invitation Already Send",
                user
            )
        );
    }
);

// accept invitation => api/v1/user/accept-invitation
export const acceptInvitation = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        const { id }: IUser = req.body;
        // find current user
        const currentUser = await checkUserExists(req.user.id);

        // check invitation user exists
        const existsUser = await checkUserExists(id);

        // update team members current user
        const updateCurrentUser = await User.updateOne(
            { _id: req.user.id },
            {
                $addToSet: {
                    teamMates: [id],
                },
                $pull: {
                    invitations: id,
                },
            }
        );

        // update team members invitation send user
        const updateExistsUser = await User.updateOne(
            { _id: id },
            {
                $addToSet: {
                    teamMates: [req.user.id],
                },
            }
        );

        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Invitation Accept Successfully",
                updateCurrentUser
            )
        );
    }
);

// get all teamMates => api/v1/user/team-mates
export const getAllTeamMates = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        // find current user
        const currentUser = await checkUserExists(req.user.id);

        // find all team mate of current user
        const users = await User.find({
            _id: currentUser.teamMates,
        });

        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Get All Team mate Successfully",
                users
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
