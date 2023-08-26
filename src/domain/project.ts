import { Document, Types } from "mongoose";

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
    tasks: string[];
    status: string;
    createdAt: string;
}
