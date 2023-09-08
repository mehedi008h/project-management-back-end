import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
    _id: string;
    userIdentifier: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    address: string;
    description: string;
    diamond: number;
    photo: {
        public_id: string;
        url: string;
    };
    work: string;
    skills: string[];
    active: true;
    invitations: string[];
    teamMates: string[];
    createdAt: string;

    matchPassword(password: string): boolean | PromiseLike<boolean>;
    getSignedToken(): string;
}
