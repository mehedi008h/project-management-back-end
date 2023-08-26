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
projectRoutes.route("/").get(getAllProject);
projectRoutes.route("/:projectIdentifier").get(getProjectDetails);
projectRoutes
    .route("/:projectIdentifier")
    .delete(isAuthenticatedUser, deleteProject);
projectRoutes.route("/update").put(updateProject);

export default projectRoutes;
