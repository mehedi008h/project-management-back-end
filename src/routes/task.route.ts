import { Router } from "express";
import {
    assignTasks,
    getAllTask,
    getTaskDetails,
} from "../controllers/task.controller";

const taskRoutes = Router();

taskRoutes.route("/:projectIdentifier").post(assignTasks);
taskRoutes.route("/:projectIdentifier").get(getAllTask);
taskRoutes.route("/:projectIdentifier/:taskIdentifier").get(getTaskDetails);

export default taskRoutes;
