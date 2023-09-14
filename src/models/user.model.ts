import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { IUser } from "../domain/user";

const UserSchema: Schema = new Schema(
    {
        userIdentifier: {
            type: String,
            unique: true,
        },
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
            maxLength: [200, "Your phone number cannot exceed 200 characters"],
        },
        address: {
            type: String,
            maxLength: [200, "Your address cannot exceed 200 characters"],
        },
        password: {
            type: String,
            required: [true, "Please enter your password"],
            minlength: [8, "Your password must be longer than 8 characters"],
            select: false,
        },
        description: {
            type: String,
        },
        photo: {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            },
        },
        work: {
            type: String,
        },
        skills: [],
        invitations: [
            {
                type: String,
                required: true,
            },
        ],
        teamMates: [
            {
                type: String,
                required: true,
            },
        ],
        diamond: { type: Number, default: 0 },
        active: { type: Boolean, default: true },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    { timestamps: true }
);

// Encrypting password before saving user
UserSchema.pre<IUser>("save", async function (next: any) {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare user password
UserSchema.methods.matchPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

// Return JWT token
UserSchema.methods.getSignedToken = function (password: string) {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Generate password reset token
UserSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
};

export default model<IUser>("User", UserSchema);
