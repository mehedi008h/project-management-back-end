import { NextFunction, Request, Response } from "express";
import { Code } from "../enum/code.enum";
import { HttpResponse } from "../domain/response";
import { Status } from "../enum/status.enum";
import { ITask } from "../domain/task";
import Task from "../models/task.model";
import { randomId } from "../utils/randomId";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { checkProjectExists } from "./project.controller";
import { ErrorHandler } from "../utils/errorHandler";

// assign new task => api/v1/task
export const assignTasks = catchAsyncErrors(
    async (req: Request, res: Response) => {
        const { projectIdentifier } = req.params;
        const { title, description, startDate, endDate, tags }: ITask =
            req.body;

        // find project
        const project = await checkProjectExists(projectIdentifier);

        // assign new task
        const task = await Task.create({
            taskIdentifier: randomId(10),
            title,
            description,
            startDate,
            endDate,
            tags,
            projectIdentifier: project.projectIdentifier,
        });

        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Task Assigned Successfully",
                task
            )
        );
    }
);

// get all task of a project => api/v1/task
export const getAllTask = catchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
        const { projectIdentifier } = req.params;

        // find project
        const project = await checkProjectExists(projectIdentifier);

        // find all project task
        const tasks = await Task.find({
            projectIdentifier: project.projectIdentifier,
        });

        res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK, "Get all project tasks", tasks)
        );
    }
);

// get task details => api/v1/task/projectIdentifier/taskIdentifier
export const getTaskDetails = catchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
        const { projectIdentifier, taskIdentifier } = req.params;

        // find task in project
        const task = await checkTaskExists(taskIdentifier, projectIdentifier);

        res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK, "Get task details", task)
        );
    }
);

// update task => api/v1/task/projectIdentifier/update
export const updateTask = catchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
        const { projectIdentifier } = req.params;
        const {
            id,
            taskIdentifier,
            title,
            description,
            startDate,
            endDate,
            tags,
            priority,
        }: ITask = req.body;

        // find task in project
        const task = await checkTaskExists(taskIdentifier, projectIdentifier);

        // update task
        const updateTask = await Task.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    title,
                    description,
                    tags,
                    startDate,
                    endDate,
                    priority,
                },
            }
        );

        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Task updated successfully",
                updateTask
            )
        );
    }
);

// delete task by taskIdentifier => api/v1/task/projectIdentifier/taskIdentifier
export const deleteTask = catchAsyncErrors(
    async (req: Request, res: Response) => {
        const { projectIdentifier, taskIdentifier } = req.params;

        // find task in project
        const task = await checkTaskExists(taskIdentifier, projectIdentifier);

        // delete task
        await task.deleteOne({ taskIdentifier });

        res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK, "Task Deleted Successfully")
        );
    }
);

// check task existence in project
export const checkTaskExists = async (
    taskIdentifier: string,
    projectIdentifier: string
) => {
    // check project existence
    const project = await checkProjectExists(projectIdentifier);
    // find task
    const task = await Task.findOne({
        taskIdentifier,
    });

    // if not exist throw error
    if (!task) {
        throw new ErrorHandler({
            statusCode: Code.NOT_FOUND,
            httpStatus: Status.NOT_FOUND,
            message: "Task you are looking for does not exist!!!",
        });
    }

    // check task exists in the project
    if (task?.projectIdentifier !== project.projectIdentifier) {
        throw new ErrorHandler({
            statusCode: Code.BAD_REQUEST,
            httpStatus: Status.BAD_REQUEST,
            message: "Task does not exist in this project!!!",
        });
    }

    return task;
};
