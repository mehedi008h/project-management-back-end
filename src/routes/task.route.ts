import { Router } from "express";
import { assignTasks, getAllTask } from "../controllers/task.controller";

const taskRoutes = Router();

taskRoutes.route("/:projectIdentifier").post(assignTasks);
taskRoutes.route("/:projectIdentifier").get(getAllTask);

export default taskRoutes;
