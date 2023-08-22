import { Document, Types } from "mongoose";
import { IUser } from "./user";

export interface ITask extends Document {
    id: Types.ObjectId;
    title: string;
    taskIdentifier: string;
    description: string;
    startDate: string;
    endDate: string;
    priority: string;
    status: string;
    tags: string[];
    developer: IUser;
    createdAt: string;
}
