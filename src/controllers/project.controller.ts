import { Request, Response } from "express";
import { Code } from "../enum/code.enum";
import { HttpResponse } from "../domain/response";
import { Status } from "../enum/status.enum";
import { IProject } from "../domain/project";
import Project from "../models/project.model";

export const createProject = async (req: Request, res: Response) => {
    const { title, description, startDate, endDate, tags }: IProject = req.body;

    try {
        const project = await Project.create({
            title,
            description,
            tags,
            startDate,
            endDate,
            projectIdentifier: "p123466",
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
