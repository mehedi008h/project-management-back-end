import { NextFunction, Response } from "express";
const cloudinary = require("cloudinary");
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
        const userCount = await User.countDocuments();

        // search users by name
        const keyword = req.query.search
            ? {
                  firstName: {
                      $regex: req.query.search,
                      $options: "i",
                  },
              }
            : {};

        const currentPage = Number(req.query.page) || 1;
        const limit = Number(req.query.pageSize) || 6;
        const skip = (currentPage - 1) * limit;

        // get all active users
        const users = await User.find({
            ...keyword,
        })
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: "descending" });

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

// get  user details => api/v1/user/userIdentifier
export const getUserDetails = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        const { id } = req.params;
        // get all active users
        const user = await checkUserExistsById(id);
        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Get user details Successfully",
                user
            )
        );
    }
);

// update user => api/v1/user/update
export const updateUser = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        // check user existence
        const user = await checkUserExistsById(req.user.id);

        const newUserData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            description: req.body.description,
            work: req.body.work,
            address: req.body.address,
            skills: req.body.skills,
        } as IUser;

        // destory existing user photo
        if (req.body.photo) {
            const image_id = user.photo.public_id;
            const res = await cloudinary.v2.uploader.destroy(image_id);

            // upload new user photo to cloudinary
            const result = await cloudinary.v2.uploader.upload(req.body.photo, {
                folder: "genious/avatar",
                width: 150,
                crop: "scale",
            });

            newUserData.photo = {
                public_id: result.public_id,
                url: result.secure_url,
            };
        }

        // user find by user id and update user
        const updateUser = await User.findByIdAndUpdate(
            req.user.id,
            newUserData,
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            }
        );

        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "User Update Successfully",
                updateUser
            )
        );
    }
);

// update user password => api/v1/user/update/password
export const updatePassword = catchAsyncErrors(
    async (req: ExpressRequest, res: Response, next: NextFunction) => {
        // check user existence
        const user = await checkUserExistsById(req.user.id);

        // Check previous user password
        const isMatched = await user.matchPassword(req.body.oldPassword);
        if (!isMatched) {
            return next(
                new ErrorHandler({
                    statusCode: Code.BAD_REQUEST,
                    httpStatus: Status.BAD_REQUEST,
                    message: "Old password is incorrect",
                })
            );
        }

        user.password = req.body.password;
        await user.save();

        res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK, "Password Change Successfully")
        );
    }
);

// send invitation => api/v1/user/send-invitation
export const sendInvitation = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        const { userIdentifier }: IUser = req.body;
        // find current user
        const currentUser = await checkUserExistsById(req.user.id);

        // check invitation user exists
        await checkUserExistsByIdentifier(userIdentifier);

        // find invitation user and send invitation
        const user = await User.updateOne(
            {
                userIdentifier: userIdentifier,
            },
            {
                $addToSet: {
                    invitations: [currentUser.userIdentifier],
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
        //find current user
        const currentUser = await checkUserExistsById(req.user.id);

        //find all invitations of current user
        const users = await User.find({
            userIdentifier: currentUser?.invitations,
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

// check invitation send or not => api/v1/user/check-invitation/userIdentifier
export const checkSendInvitation = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        const { userIdentifier } = req.params;
        // find current user
        const currentUser = await checkUserExistsById(req.user.id);

        // check invitation user exists
        const existUser = await checkUserExistsByIdentifier(userIdentifier);

        // check invitation send or not
        const user = currentUser.invitations.includes(existUser.userIdentifier);

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
        const { userIdentifier }: IUser = req.body;
        // find current user
        const currentUser = await checkUserExistsById(req.user.id);

        // check invitation user exists
        const existsUser = await checkUserExistsByIdentifier(userIdentifier);

        // update team members current user
        const updateCurrentUser = await User.updateOne(
            { userIdentifier: req.user.userIdentifier },
            {
                $addToSet: {
                    teamMates: [userIdentifier],
                },
                $pull: {
                    invitations: userIdentifier,
                },
            }
        );

        // update team members invitation send user
        const updateExistsUser = await User.updateOne(
            { userIdentifier: userIdentifier },
            {
                $addToSet: {
                    teamMates: [req.user.userIdentifier],
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
        const currentUser = await checkUserExistsById(req.user.id);

        // find all team mate of current user
        const users = await User.find({
            userIdentifier: currentUser.teamMates,
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

// unsend invitation => api/v1/user/unsend-invitation
export const unsendInvitation = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        const { userIdentifier }: IUser = req.body;
        // find current user
        const currentUser = await checkUserExistsById(req.user.id);

        // check invitation user exists
        const existsUser = await checkUserExistsByIdentifier(userIdentifier);

        // update and remove invitation
        const updateExistsUser = await User.updateOne(
            { userIdentifier: userIdentifier },
            {
                $pull: {
                    invitations: req.user.userIdentifier,
                },
            }
        );

        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Unsend Invitation Successfully",
                updateExistsUser
            )
        );
    }
);

// remove team mate invitation => api/v1/user/remove-team-mate
export const removeTeamMate = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        const { userIdentifier }: IUser = req.body;
        // find current user
        const currentUser = await checkUserExistsById(req.user.id);

        // check invitation user exists
        const existsUser = await checkUserExistsByIdentifier(userIdentifier);

        // update team members current user
        const updateCurrentUser = await User.updateOne(
            { userIdentifier: req.user.userIdentifier },
            {
                $pull: {
                    teamMates: userIdentifier,
                },
            }
        );

        // update and remove team mate
        const updateExistsUser = await User.updateOne(
            { userIdentifier: userIdentifier },
            {
                $pull: {
                    teamMates: req.user.userIdentifier,
                },
            }
        );

        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Remove Team Mate Successfully",
                updateCurrentUser
            )
        );
    }
);

// check user existence by identifier
export const checkUserExistsByIdentifier = async (userIdentifier: string) => {
    // find user
    const user = await User.findOne({
        userIdentifier,
    });
    if (!user) {
        throw new ErrorHandler({
            statusCode: Code.NOT_FOUND,
            httpStatus: Status.NOT_FOUND,
            message: "User you are looking for does not exist!!!",
        });
    }

    return user;
};

// check user existence by id
export const checkUserExistsById = async (id: string) => {
    // find user
    const user = await User.findById(id);
    if (!user) {
        throw new ErrorHandler({
            statusCode: Code.NOT_FOUND,
            httpStatus: Status.NOT_FOUND,
            message: "User you are looking for does not exist!!!",
        });
    }

    return user;
};
