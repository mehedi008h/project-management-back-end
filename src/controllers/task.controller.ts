import { Request, Response } from "express";
import { Code } from "../enum/code.enum";
import { HttpResponse } from "../domain/response";
import { Status } from "../enum/status.enum";
import Project from "../models/project.model";
import { ITask } from "../domain/task";
import Task from "../models/task.model";
import { randomId } from "../utils/randomId";

// assign new task => api/v1/task
export const assignTasks = async (req: Request, res: Response) => {
    try {
        const { projectIdentifier } = req.params;
        const { title, description, startDate, endDate, tags }: ITask =
            req.body;

        // find project
        const project = await Project.findOne({ projectIdentifier });
        if (!project)
            return res
                .status(Code.NOT_FOUND)
                .send(
                    new HttpResponse(
                        Code.NOT_FOUND,
                        Status.NOT_FOUND,
                        "Project not found with this identifier",
                        project
                    )
                );

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
    } catch (error) {
        console.error(error);
        res.status(Code.INTERNAL_SERVER_ERROR).send(
            new HttpResponse(
                Code.INTERNAL_SERVER_ERROR,
                Status.INTERNAL_SERVER_ERROR,
                "An error occurred"
            )
        );
    }
};

// get all task of a project => api/v1/task
export const getAllTask = async (req: Request, res: Response) => {
    try {
        const { projectIdentifier } = req.params;

        // find project
        const project = await Project.findOne({ projectIdentifier });
        if (!project)
            return res
                .status(Code.NOT_FOUND)
                .send(
                    new HttpResponse(
                        Code.NOT_FOUND,
                        Status.NOT_FOUND,
                        "Project not found with this identifier",
                        project
                    )
                );

        const tasks = await Task.find({
            projectIdentifier: project.projectIdentifier,
        });

        res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK, "Get all project tasks", tasks)
        );
    } catch (error) {
        console.error(error);
        res.status(Code.INTERNAL_SERVER_ERROR).send(
            new HttpResponse(
                Code.INTERNAL_SERVER_ERROR,
                Status.INTERNAL_SERVER_ERROR,
                "An error occurred"
            )
        );
    }
};
