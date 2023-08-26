import { Router } from "express";
import {
    createProject,
    deleteProject,
    getAllProject,
    getProjectDetails,
    updateProject,
} from "../controllers/project.controller";
import { isAuthenticatedUser } from "../middlewares/auth";

const projectRoutes = Router();

projectRoutes.route("/").post(isAuthenticatedUser, createProject);
projectRoutes.route("/").get(isAuthenticatedUser, getAllProject);
projectRoutes
    .route("/:projectIdentifier")
    .get(isAuthenticatedUser, getProjectDetails);
projectRoutes
    .route("/:projectIdentifier")
    .delete(isAuthenticatedUser, deleteProject);
projectRoutes.route("/update").put(isAuthenticatedUser, updateProject);

export default projectRoutes;
