import { Router } from "express";
import {
    createProject,
    deleteProject,
    getAllProject,
    getProjectDetails,
    updateProject,
} from "../controllers/project.controller";

const projectRoutes = Router();

projectRoutes.route("/").post(createProject);
projectRoutes.route("/").get(getAllProject);
projectRoutes.route("/:projectIdentifier").get(getProjectDetails);
projectRoutes.route("/:projectIdentifier").delete(deleteProject);
projectRoutes.route("/update").put(updateProject);

export default projectRoutes;
