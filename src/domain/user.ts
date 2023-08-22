import { Document, Types } from "mongoose";

export interface IUser extends Document {
    id: Types.ObjectId;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    address: string;
    description: string;
    photo: {
        publicId: string;
        url: string;
    };
    work: string;
    active: true;
    createdAt: string;
}
