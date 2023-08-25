import { Request, Response } from "express";
import { Code } from "../enum/code.enum";
import { HttpResponse } from "../domain/response";
import { Status } from "../enum/status.enum";
import { IProject } from "../domain/project";
import Project from "../models/project.model";
import { randomId } from "../utils/randomId";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";

// create new project => api/v1/project
export const createProject = catchAsyncErrors(
    async (req: Request, res: Response) => {
        const { title, description, startDate, endDate, tags }: IProject =
            req.body;

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
    }
);

// get all project => api/v1/project
export const getAllProject = catchAsyncErrors(
    async (req: Request, res: Response) => {
        const projects = await Project.find();

        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Successfully get project",
                projects
            )
        );
    }
);

// get project details by projectIdentifier => api/v1/project/projectIdentifier
export const getProjectDetails = catchAsyncErrors(
    async (req: Request, res: Response) => {
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
    }
);

// delete project by projectIdentifier => api/v1/project/projectIdentifier
export const deleteProject = catchAsyncErrors(
    async (req: Request, res: Response) => {
        const { projectIdentifier } = req.params;
        const project = await Project.deleteOne({ projectIdentifier });

        res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK, "Project Deleted Successfully")
        );
    }
);

// update project => api/v1/project/update
export const updateProject = catchAsyncErrors(
    async (req: Request, res: Response) => {
        const {
            id,
            title,
            description,
            startDate,
            endDate,
            tags,
            status,
        }: IProject = req.body;

        const project = await Project.updateOne(
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
                    status,
                    photo: {
                        public_id: "result.public_id",
                        url: "result.secure_url",
                    },
                },
            }
        );

        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Project Update Successfully",
                project
            )
        );
    }
);
