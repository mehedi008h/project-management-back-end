import { Router } from "express";
import {
    assignTasks,
    changeTaskStatus,
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
    .route("/details/:taskIdentifier")
    .get(isAuthenticatedUser, getTaskDetails);
taskRoutes.route("/update").put(isAuthenticatedUser, updateTask);
taskRoutes
    .route("/delete/:taskIdentifier")
    .delete(isAuthenticatedUser, deleteTask);
taskRoutes
    .route("/change-status/:taskIdentifier")
    .put(isAuthenticatedUser, changeTaskStatus);

export default taskRoutes;
