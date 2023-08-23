import { Schema, model } from "mongoose";
import { ITask } from "../domain/task";

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
            default: "Low",
        },
        status: { type: String, default: "Todo" },
        tags: [],
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
