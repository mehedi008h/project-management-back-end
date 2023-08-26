import { Document, Types } from "mongoose";

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
    projectIdentifier: string;
    developer: string;
    createdAt: string;
}
