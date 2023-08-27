import { Schema, model } from "mongoose";
import { IProject } from "../domain/project";
import { ProjectStatus } from "../enum/projectStatus.enum";

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
        projectLeader: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        developers: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
        status: {
            type: String,
            default: ProjectStatus.TODO,
            enum: {
                values: ["Todo", "Progress", "Completed"],
                message: "Please select correct status for project",
            },
        },
        tags: [],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export default model<IProject>("Project", ProjectSchema);
