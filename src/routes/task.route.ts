import { Router } from "express";
import {
    assignTasks,
    deleteTask,
    getAllTask,
    getTaskDetails,
    updateTask,
} from "../controllers/task.controller";
import { isAuthenticatedUser } from "../middlewares/auth";

const taskRoutes = Router();

taskRoutes.route("/:projectIdentifier").post(isAuthenticatedUser, assignTasks);
taskRoutes.route("/:projectIdentifier").get(isAuthenticatedUser, getAllTask);
taskRoutes
    .route("/:projectIdentifier/:taskIdentifier")
    .get(isAuthenticatedUser, getTaskDetails);
taskRoutes
    .route("/:projectIdentifier/update")
    .put(isAuthenticatedUser, updateTask);
taskRoutes
    .route("/:projectIdentifier/:taskIdentifier")
    .delete(isAuthenticatedUser, deleteTask);

export default taskRoutes;
