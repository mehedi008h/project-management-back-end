import { Router } from "express";
import { createProject } from "../controllers/project.controller";

const projectRoutes = Router();

projectRoutes.route("/").post(createProject);

export default projectRoutes;
