import { Document, Types } from "mongoose";

export interface IProject extends Document {
    _id: string;
    title: string;
    projectIdentifier: string;
    description: string;
    startDate: string;
    endDate: string;
    photo: {
        public_id: string;
        url: string;
    };
    projectLeader: string;
    tags: string[];
    developers: string[];
    tasks: string[];
    status: string;
    createdAt: string;
}
