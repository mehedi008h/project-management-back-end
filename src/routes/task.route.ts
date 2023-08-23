import { Router } from "express";
import { assignTasks } from "../controllers/task.controller";

const taskRoutes = Router();

taskRoutes.route("/:projectIdentifier").post(assignTasks);

export default taskRoutes;
