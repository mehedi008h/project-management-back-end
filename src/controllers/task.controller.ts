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

        // find project
        const project = await checkProjectExists(projectIdentifier);

        // find task
        const task = await Task.findOne({
            taskIdentifier,
        });

        if (!task) {
            throw new ErrorHandler({
                statusCode: Code.NOT_FOUND,
                httpStatus: Status.NOT_FOUND,
                message: "Task you are looking for does not exist!!!",
            });
        }

        if (task?.projectIdentifier !== project.projectIdentifier) {
            throw new ErrorHandler({
                statusCode: Code.BAD_REQUEST,
                httpStatus: Status.BAD_REQUEST,
                message:
                    "Task you are looking for does not exist in this project!!!",
            });
        }

        res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK, "Get all project tasks", task)
        );
    }
);
