import { Schema, model } from "mongoose";
import { IProject } from "../domain/project";

const ProjectSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter your project title"],
        },
        projectIdentifier: {
            type: String,
            unique: true,
        },
        description: {
            type: String,
            required: [true, "Please enter your project description"],
        },
        startDate: {
            type: Date,
            required: [true, "Please enter your project start date"],
        },
        endDate: {
            type: Date,
            required: [true, "Please enter your project end date"],
        },
        photo: {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
        tags: [],
        status: { type: String, default: "Todo" },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export default model<IProject>("Project", ProjectSchema);
