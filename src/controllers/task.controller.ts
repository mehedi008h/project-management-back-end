import { NextFunction, Request, Response } from "express";
import { Code } from "../enum/code.enum";
import { HttpResponse } from "../domain/response";
import { Status } from "../enum/status.enum";
import Project from "../models/project.model";
import { ITask } from "../domain/task";
import Task from "../models/task.model";
import { randomId } from "../utils/randomId";
import { ErrorHandler } from "../utils/errorHandler";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";

// assign new task => api/v1/task
export const assignTasks = catchAsyncErrors(
    async (req: Request, res: Response) => {
        const { projectIdentifier } = req.params;
        const { title, description, startDate, endDate, tags }: ITask =
            req.body;

        // find project
        const project = await Project.findOne({ projectIdentifier });
        if (!project) {
            throw new ErrorHandler({
                statusCode: Code.NOT_FOUND,
                httpStatus: Status.NOT_FOUND,
                message: "Project you are looking for does not exist!!!",
            });
        }

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
        const project = await Project.findOne({ projectIdentifier });
        if (!project) {
            throw new ErrorHandler({
                statusCode: Code.NOT_FOUND,
                httpStatus: Status.NOT_FOUND,
                message: "Project you are looking for does not exist!!!",
            });
        }

        // find all project task
        const tasks = await Task.find({
            projectIdentifier: project.projectIdentifier,
        });

        res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK, "Get all project tasks", tasks)
        );
    }
);

// const checkProjectExists = async(projectIdentifier: string) => {
//     const project = await Project.findOne({ projectIdentifier });
//     if (!project)
//         return res
//             .status(Code.NOT_FOUND)
//             .send(
//                 new HttpResponse(
//                     Code.NOT_FOUND,
//                     Status.NOT_FOUND,
//                     "Project not found with this identifier",
//                     project
//                 )
//             );
// }