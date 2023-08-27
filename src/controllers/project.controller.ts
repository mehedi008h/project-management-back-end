import { Response } from "express";
import { Code } from "../enum/code.enum";
import { HttpResponse } from "../domain/response";
import { Status } from "../enum/status.enum";
import { IProject } from "../domain/project";
import Project from "../models/project.model";
import User from "../models/user.model";
import { randomId } from "../utils/randomId";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { ErrorHandler } from "../utils/errorHandler";
import { ExpressRequest } from "../domain/expressRequest.interface";
import { IUser } from "../domain/user";
import { checkUserExists } from "./user.controller";

// create new project => api/v1/project
export const createProject = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        const { title, description, startDate, endDate, tags }: IProject =
            req.body;

        const project = await Project.create({
            title,
            description,
            tags,
            startDate,
            endDate,
            projectIdentifier: randomId(10),
            // TODO: implement cloudinary
            photo: {
                public_id: "result.public_id",
                url: "result.secure_url",
            },
            projectLeader: req.user.id,
            developers: [req.user.id],
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
// permission => PROJECT_LEADER, DEVELOPER
export const getAllProject = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        // find specific developer project
        const projects = await Project.find({
            developers: req.user.id,
        });

        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Successfully get projects",
                projects
            )
        );
    }
);

// get project details by projectIdentifier => api/v1/project/projectIdentifier
// permission => PROJECT_LEADER, DEVELOPER
export const getProjectDetails = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        const { projectIdentifier } = req.params;
        // check project existence
        const project = await checkProjectExists(projectIdentifier);

        // check project developer
        await checkProjectDeveloper(project, req.user.id);

        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Successfully get project details",
                project
            )
        );
    }
);

// delete project by projectIdentifier => api/v1/project/projectIdentifier
// permission => PROJECT_LEADER
export const deleteProject = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        const { projectIdentifier } = req.params;
        // check project existence
        const project = await checkProjectExists(projectIdentifier);

        // check project leader
        await checkProjectLeader(project.projectLeader, req.user.id);

        // delete project
        await project.deleteOne({ projectIdentifier });

        res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK, "Project Deleted Successfully")
        );
    }
);

// update project => api/v1/project/update
// permission => PROJECT_LEADER
export const updateProject = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        const {
            id,
            projectIdentifier,
            title,
            description,
            startDate,
            endDate,
            tags,
            status,
        }: IProject = req.body;

        // check project existence
        const project = await checkProjectExists(projectIdentifier);

        // check project leader
        await checkProjectLeader(project.projectLeader, req.user.id);

        // project find by project id and update project
        const updateProject = await Project.updateOne(
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
                updateProject
            )
        );
    }
);

// assign developer => api/v1/project/assign-developer/projectIdentifier
// permission => PROJECT_LEADER
export const assignDeveloper = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        const { projectIdentifier } = req.params;

        const { id }: IUser = req.body;

        // check project existence
        const project = await checkProjectExists(projectIdentifier);

        // check project leader
        await checkProjectLeader(project.projectLeader, req.user.id);

        // check user existence
        const user = await checkUserExists(id);

        // find by project id and assign developer to project
        const updateProject = await Project.updateOne(
            {
                _id: project.id,
            },
            {
                $addToSet: {
                    developers: [user.id],
                },
            }
        );

        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Assign Developer Successfully",
                updateProject
            )
        );
    }
);

// check project existence
export const checkProjectExists = async (projectIdentifier: string) => {
    // find project
    const project = await Project.findOne({ projectIdentifier });
    if (!project) {
        throw new ErrorHandler({
            statusCode: Code.NOT_FOUND,
            httpStatus: Status.NOT_FOUND,
            message: "Project you are looking for does not exist!!!",
        });
    }

    return project;
};

// check project leader
export const checkProjectLeader = async (
    projectLeaderId: string,
    currentUserId: string
) => {
    if (projectLeaderId != currentUserId) {
        throw new ErrorHandler({
            statusCode: Code.UNAUTHORIZED,
            httpStatus: Status.UNAUTHORIZED,
            message: "You don't have permission to access this resources!!!",
        });
    }
};

// check project developer
export const checkProjectDeveloper = async (
    project: IProject,
    currentUserId: string
) => {
    if (!project.developers.includes(currentUserId)) {
        throw new ErrorHandler({
            statusCode: Code.UNAUTHORIZED,
            httpStatus: Status.UNAUTHORIZED,
            message: "You don't have permission to access this resources!!!",
        });
    }
};
