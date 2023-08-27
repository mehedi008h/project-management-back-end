import { NextFunction, Response } from "express";
import { Code } from "../enum/code.enum";
import { HttpResponse } from "../domain/response";
import { Status } from "../enum/status.enum";
import { ITask } from "../domain/task";
import Task from "../models/task.model";
import { randomId } from "../utils/randomId";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import {
    checkProjectDeveloper,
    checkProjectExists,
    checkProjectLeader,
} from "./project.controller";
import { ErrorHandler } from "../utils/errorHandler";
import { ExpressRequest } from "../domain/expressRequest.interface";

// assign new task => api/v1/task/projectIdentifier
// permission => PROJECT_LEADER
export const assignTasks = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        const { projectIdentifier } = req.params;
        const {
            title,
            description,
            startDate,
            endDate,
            tags,
            developer,
        }: ITask = req.body;

        // find project
        const project = await checkProjectExists(projectIdentifier);

        // check project leader
        await checkProjectLeader(project.projectLeader, req.user.id);

        // assign new task
        const task = await Task.create({
            taskIdentifier: randomId(10),
            title,
            description,
            startDate,
            endDate,
            tags,
            developer,
            assigned: req.user.id,
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
// permission => PROJECT_LEADER, DEVELOPER
export const getAllTask = catchAsyncErrors(
    async (req: ExpressRequest, res: Response, next: NextFunction) => {
        const { projectIdentifier } = req.params;

        // find project
        const project = await checkProjectExists(projectIdentifier);

        // check project developer
        await checkProjectDeveloper(project, req.user.id);

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
// permission => PROJECT_LEADER, TASK_DEVELOPER
export const getTaskDetails = catchAsyncErrors(
    async (req: ExpressRequest, res: Response, next: NextFunction) => {
        const { projectIdentifier, taskIdentifier } = req.params;

        // check task authorization -> project leader and developer
        const task = await checkTaskAuthorization(
            projectIdentifier,
            taskIdentifier,
            req.user.id
        );

        res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK, "Get task details", task)
        );
    }
);

// update task => api/v1/task/projectIdentifier/update
// permission => PROJECT_LEADER
export const updateTask = catchAsyncErrors(
    async (req: ExpressRequest, res: Response, next: NextFunction) => {
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
        const { project } = await checkTaskExists(
            taskIdentifier,
            projectIdentifier
        );

        // check project leader for update
        await checkProjectLeader(project.projectLeader, req.user.id);

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
// permission => PROJECT_LEADER
export const deleteTask = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        const { projectIdentifier, taskIdentifier } = req.params;

        // find task in project
        const { project, task } = await checkTaskExists(
            taskIdentifier,
            projectIdentifier
        );

        // check project leader for delete
        await checkProjectLeader(project.projectLeader, req.user.id);

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

    return { project, task };
};

// check task authorization
export const checkTaskAuthorization = async (
    projectIdentifier: string,
    taskIdentifier: string,
    userId: string
) => {
    const { project, task } = await checkTaskExists(
        taskIdentifier,
        projectIdentifier
    );

    if (task?.developer == userId || project.projectLeader == userId) {
        return task;
    } else {
        throw new ErrorHandler({
            statusCode: Code.NOT_FOUND,
            httpStatus: Status.NOT_FOUND,
            message: "You don't have permission to access this resources!!!",
        });
    }
};
