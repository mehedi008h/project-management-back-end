import { Document, Types } from "mongoose";
import { ITask } from "./task";

export interface IProject extends Document {
    id: Types.ObjectId;
    title: string;
    projectIdentifier: string;
    description: string;
    startDate: string;
    endDate: string;
    photo: {
        publicId: string;
        url: string;
    };
    projectLeader: Types.ObjectId;
    tags: string[];
    developers: Types.ObjectId[];
    tasks: ITask[];
    status: string;
    createdAt: string;
}
