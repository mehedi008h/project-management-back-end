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

// change task status => api/v1/task/change-status/taskIdentifier
// permission => TASK_DEVELOPER
export const changeTaskStatus = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        const { taskIdentifier } = req.params;
        const { status }: ITask = req.body;

        // check permissions to change task status
        await checkTaskDeveloper(taskIdentifier, req.user.id);

        // change task status
        const task = await Task.updateOne(
            {
                taskIdentifier,
                developer: req.user.id,
            },
            {
                $set: {
                    status,
                },
            }
        );

        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Update Task Status Successfully",
                task
            )
        );
    }
);

// get all task of a project => api/v1/task/projectIdentifier
// permission => PROJECT_LEADER, DEVELOPER
export const getProjectAllTask = catchAsyncErrors(
    async (req: ExpressRequest, res: Response, next: NextFunction) => {
        const { projectIdentifier } = req.params;

        // find project
        const project = await checkProjectExists(projectIdentifier);

        // check permissions to get tasks
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

// get all task of user => api/v1/task/user
// permission => DEVELOPER
export const getUserAllTask = catchAsyncErrors(
    async (req: ExpressRequest, res: Response, next: NextFunction) => {
        // find all project task
        const tasks = await Task.find({
            developer: req.user.id,
        });

        res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK, "Get all tasks", tasks)
        );
    }
);

// get task details => api/v1/task/details/taskIdentifier
// permission => PROJECT_LEADER, TASK_DEVELOPER
export const getTaskDetails = catchAsyncErrors(
    async (req: ExpressRequest, res: Response, next: NextFunction) => {
        const { taskIdentifier } = req.params;

        // check task authorization -> project leader and developer
        const task = await checkTaskAuthorization(taskIdentifier, req.user.id);

        res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK, "Get task details", task)
        );
    }
);

// update task => api/v1/task/update
// permission => PROJECT_LEADER
export const updateTask = catchAsyncErrors(
    async (req: ExpressRequest, res: Response, next: NextFunction) => {
        const {
            _id,
            taskIdentifier,
            title,
            description,
            startDate,
            endDate,
            tags,
            priority,
        }: ITask = req.body;

        // find task in project
        const { project } = await checkTaskExistsInProject(taskIdentifier);

        // check project leader for update
        await checkProjectLeader(project.projectLeader, req.user.id);

        // update task
        const updateTask = await Task.updateOne(
            {
                _id: _id,
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

// delete task by taskIdentifier => api/v1/task/delete/taskIdentifier
// permission => PROJECT_LEADER
export const deleteTask = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        const { taskIdentifier } = req.params;

        // find task in project
        const { project, task } = await checkTaskExistsInProject(
            taskIdentifier
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
export const checkTaskExistsInProject = async (taskIdentifier: string) => {
    // check task existence
    const task = await checkTaskExists(taskIdentifier);

    // check project existence
    const project = await checkProjectExists(task.projectIdentifier);

    // check task exists in the project
    if (task?.projectIdentifier !== project.projectIdentifier) {
        throw new ErrorHandler({
            statusCode: Code.NOT_FOUND,
            httpStatus: Status.NOT_FOUND,
            message: "Task does not exist in this project!!!",
        });
    }

    return { project, task };
};

// check task authorization
export const checkTaskAuthorization = async (
    taskIdentifier: string,
    userId: string
) => {
    const { project, task } = await checkTaskExistsInProject(taskIdentifier);

    if (task?.developer == userId || project.projectLeader == userId) {
        return task;
    } else {
        throw new ErrorHandler({
            statusCode: Code.BAD_REQUEST,
            httpStatus: Status.BAD_REQUEST,
            message: "You don't have permission to access this resources!!!",
        });
    }
};

// check task exists
export const checkTaskExists = async (taskIdentifier: string) => {
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

    return task;
};

// check task developer permissions
export const checkTaskDeveloper = async (
    taskIdentifier: string,
    userId: string
) => {
    const task = await checkTaskExists(taskIdentifier);

    if (task.developer != userId) {
        throw new ErrorHandler({
            statusCode: Code.BAD_REQUEST,
            httpStatus: Status.BAD_REQUEST,
            message: "You don't have permission to access this resources!!!",
        });
    }
};
