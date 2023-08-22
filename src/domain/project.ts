import { Document, Types } from "mongoose";
import { IUser } from "./user";
import { ITask } from "./task";

export interface IProject extends Document {
    id: Types.ObjectId;
    title: string;
    projectIdentifier: Number;
    description: string;
    startDate: string;
    endDate: string;
    photo: {
        publicId: string;
        url: string;
    };
    projectLeader: IUser;
    tags: string[];
    developers: IUser[];
    tasks: ITask[];
    createdAt: string;
}
