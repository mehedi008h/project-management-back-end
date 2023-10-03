import { Router } from "express";
import {
    assignTasks,
    changeTaskStatus,
    deleteTask,
    getDashboardTask,
    getProjectAllTask,
    getTaskDetails,
    getUserAllTask,
    updateTask,
} from "../controllers/task.controller";
import { isAuthenticatedUser } from "../middlewares/auth";

const taskRoutes = Router();

taskRoutes.route("/:projectIdentifier").post(isAuthenticatedUser, assignTasks);
taskRoutes
    .route("/:projectIdentifier")
    .get(isAuthenticatedUser, getProjectAllTask);
taskRoutes
    .route("/dashboard/all-task/status")
    .get(isAuthenticatedUser, getDashboardTask);
taskRoutes.route("/user/all/task").get(isAuthenticatedUser, getUserAllTask);
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
