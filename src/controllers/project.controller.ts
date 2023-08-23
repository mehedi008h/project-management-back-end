import { Request, Response } from "express";
import { Code } from "../enum/code.enum";
import { HttpResponse } from "../domain/response";
import { Status } from "../enum/status.enum";
import { IProject } from "../domain/project";
import Project from "../models/project.model";
import { randomId } from "../utils/randomId";

// create new project => api/v1/project
export const createProject = async (req: Request, res: Response) => {
    const { title, description, startDate, endDate, tags }: IProject = req.body;

    try {
        const project = await Project.create({
            title,
            description,
            tags,
            startDate,
            endDate,
            projectIdentifier: randomId(10),
            photo: {
                public_id: "result.public_id",
                url: "result.secure_url",
            },
        });

        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Project Create Successfully",
                project
            )
        );
    } catch (error: any) {
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

// get all project => api/v1/project
export const getAllProject = async (req: Request, res: Response) => {
    try {
        const projects = await Project.find();

        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Successfully get project",
                projects
            )
        );
    } catch (error: any) {
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

// get single project by projectIdentifier => api/v1/project
export const getProjectDetails = async (req: Request, res: Response) => {
    try {
        const { projectIdentifier } = req.params;
        const project = await Project.findOne({ projectIdentifier });

        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Successfully get project",
                project
            )
        );
    } catch (error: any) {
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
