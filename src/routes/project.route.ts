import { Router } from "express";
import {
    assignDeveloper,
    createProject,
    deleteProject,
    getAllAssignDeveloper,
    getAllProject,
    getProjectDetails,
    removeAssignDeveloper,
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
projectRoutes
    .route("/remove-developer/:projectIdentifier")
    .put(isAuthenticatedUser, removeAssignDeveloper);
projectRoutes
    .route("/project-developer/:projectIdentifier")
    .get(isAuthenticatedUser, getAllAssignDeveloper);

export default projectRoutes;
