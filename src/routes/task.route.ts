import { Router } from "express";
import {
    assignTasks,
    getAllTask,
    getTaskDetails,
    updateTask,
} from "../controllers/task.controller";

const taskRoutes = Router();

taskRoutes.route("/:projectIdentifier").post(assignTasks);
taskRoutes.route("/:projectIdentifier").get(getAllTask);
taskRoutes.route("/:projectIdentifier/:taskIdentifier").get(getTaskDetails);
taskRoutes.route("/:projectIdentifier/update").put(updateTask);

export default taskRoutes;
