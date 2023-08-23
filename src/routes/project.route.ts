import { Router } from "express";
import {
    createProject,
    getAllProject,
    getProjectDetails,
} from "../controllers/project.controller";

const projectRoutes = Router();

projectRoutes.route("/").post(createProject);
projectRoutes.route("/").get(getAllProject);
projectRoutes.route("/:projectIdentifier").get(getProjectDetails);

export default projectRoutes;
