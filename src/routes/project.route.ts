import { Router } from "express";
import {
    assignDeveloper,
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
projectRoutes
    .route("/assign-developer/:projectIdentifier")
    .put(isAuthenticatedUser, assignDeveloper);

export default projectRoutes;
