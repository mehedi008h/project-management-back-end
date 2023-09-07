import { Response } from "express";
const cloudinary = require("cloudinary");
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

             // upload new project photo to cloudinary
            const result = await cloudinary.v2.uploader.upload(req.body.photo, {
                folder: "genious/projects",
               
            });

        const project = await Project.create({
            title,
            description,
            tags,
            startDate,
            endDate,
            projectIdentifier: randomId(10),
            photo: {
                public_id: result.public_id,
                url: result.secure_url,
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

// change project status => api/v1/project/change-status/projectIdentifier
// permission => PROJECT_LEADER
export const changeProjectStatus = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        const { projectIdentifier } = req.params;
        const { status }: IProject = req.body;

        // check permissions to change project status
        await checkProjectLeader(projectIdentifier, req.user.id);

        // change project status
        const project = await Project.updateOne(
            {
                projectIdentifier,
                projectLeader: req.user.id,
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
                "Update Project Status Successfully",
                project
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

        // check project existence
        const project = await checkProjectExists(req.body.projectIdentifier);

        // check project leader
        await checkProjectLeader(project.projectLeader, req.user.id);

        const newProjectData = {
            title:req.body.title,
            description:req.body.description,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
            tags:req.body.tags,
            status:req.body.status,
        }as IProject;

         // destory existing project photo
        if (req.body.photo) {
            const image_id = project.photo.public_id;
            const res = await cloudinary.v2.uploader.destroy(image_id);

            // upload new user photo to cloudinary
            const result = await cloudinary.v2.uploader.upload(req.body.photo, {
                folder: "genious/projects",
            });

            newProjectData.photo = {
                public_id: result.public_id,
                url: result.secure_url,
            };
        }

        // project find by project id and update project
        const updateProject = await Project.findByIdAndUpdate(
            req.body._id,
            newProjectData,
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
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

        const { _id }: IUser = req.body;

        // check project existence
        const project = await checkProjectExists(projectIdentifier);

        // check project leader
        await checkProjectLeader(project.projectLeader, req.user.id);

        // check user existence
        const user = await checkUserExists(_id);

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

// remove assign developer => api/v1/project/remove-developer/projectIdentifier
// permission => PROJECT_LEADER
export const removeAssignDeveloper = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        const { projectIdentifier } = req.params;

        const { _id }: IUser = req.body;

        // check project existence
        const project = await checkProjectExists(projectIdentifier);

        // check project leader
        await checkProjectLeader(project.projectLeader, req.user.id);

        // check user existence
        const user = await checkUserExists(_id);

        // find by project id and remove assign developer to project
        const updateProject = await Project.updateOne(
            {
                _id: project.id,
            },
            {
                $pull: {
                    developers: user.id,
                },
            }
        );

        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Remove Assign Developer Successfully",
                updateProject
            )
        );
    }
);

// get all assign developer => api/v1/project/project-developer/projectIdentifier
// permission => PROJECT_LEADER, DEVELOPER
export const getAllAssignDeveloper = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        const { projectIdentifier } = req.params;

        // check project existence
        const project = await checkProjectExists(projectIdentifier);

        // get all project developer
        const users = await User.find({
            _id: project.developers,
        });

        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Get All Project Developer Successfully",
                users
            )
        );
    }
);

// check assign developer => api/v1/project/check-developer/projectIdentifier
// permission => PROJECT_LEADER, DEVELOPER
export const checkAssignDeveloper = catchAsyncErrors(
    async (req: ExpressRequest, res: Response) => {
        const { _id }: IUser = req.body;
        const { projectIdentifier } = req.params;

        // check project existence
        const project = await checkProjectExists(projectIdentifier);

        const assign = project.developers.includes(_id);

        res.status(Code.OK).send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Already assign this developer to project",
                assign
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
