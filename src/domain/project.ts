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
    projectLeader: string;
    tags: string[];
    developers: string[];
    tasks: ITask[];
    status: string;
    createdAt: string;
}
