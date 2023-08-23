import { Router } from "express";
import {
    createProject,
    getAllProject,
} from "../controllers/project.controller";

const projectRoutes = Router();

projectRoutes.route("/").post(createProject);
projectRoutes.route("/").get(getAllProject);

export default projectRoutes;
