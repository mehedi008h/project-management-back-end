import { Schema, model } from "mongoose";
import { IUser } from "../domain/user";

const UserSchema: Schema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please enter your first name"],
            maxLength: [15, "Your first name cannot exceed 15 characters"],
        },
        lastName: {
            type: String,
            required: [true, "Please enter your last name"],
            maxLength: [15, "Your lat name cannot exceed 15 characters"],
        },
        username: {
            type: String,
            required: [true, "Please enter your username"],
            maxLength: [15, "Your usename cannot exceed 15 characters"],
        },
        email: {
            type: String,
            lowercase: true,
            required: [true, "Please enter your email"],
            match: [
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                "Please use a valid address",
            ],
            unique: true,
        },
        phone: {
            type: String,
            required: [false, "Please enter your phone number"],
            maxLength: [200, "Your phone number cannot exceed 200 characters"],
        },
        address: {
            type: String,
            required: [false, "Please enter your address"],
            maxLength: [200, "Your address cannot exceed 200 characters"],
        },
        password: {
            type: String,
            required: [true, "Please enter your password"],
            minlength: [6, "Your password must be longer than 6 characters"],
            select: false,
        },
        description: {
            type: String,
            required: [true, "Please enter your bio"],
        },
        avatar: {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
        work: {
            type: String,
        },
        diamond: { type: Number, default: 0 },
        active: { type: Boolean, default: true },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export default model<IUser>("User", UserSchema);
