import { Schema, model } from "mongoose";
import { ITask } from "../domain/task";
import { Priority } from "../enum/priority.enum";
import { ProjectStatus } from "../enum/projectStatus.enum";

const TaskSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter your task title"],
        },
        taskIdentifier: {
            type: String,
            unique: true,
        },
        description: {
            type: String,
            required: [true, "Please enter your task description"],
        },
        startDate: {
            type: Date,
            required: [true, "Please enter your task start date"],
        },
        endDate: {
            type: Date,
            required: [true, "Please enter your task end date"],
        },
        priority: {
            type: String,
            default: Priority.LOW,
            enum: {
                values: ["Low", "Medium", "High"],
                message: "Please select correct priority for task",
            },
        },
        status: {
            type: String,
            default: ProjectStatus.TODO,
            enum: {
                values: ["Todo", "Progress", "Completed"],
                message: "Please select correct status for task",
            },
        },
        tags: [],
        developer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please assign a Developer!!!"],
        },
        assigned: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        projectIdentifier: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export default model<ITask>("Task", TaskSchema);
