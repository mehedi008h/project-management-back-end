import { Router } from "express";
import {
    getAllInvitation,
    getAllUsers,
    sendInvitation,
} from "../controllers/user.controller";
import { isAuthenticatedUser } from "../middlewares/auth";

const userRoutes = Router();

userRoutes.route("/").get(isAuthenticatedUser, getAllUsers);
userRoutes.route("/send-invitation").put(isAuthenticatedUser, sendInvitation);
userRoutes.route("/invitation").get(isAuthenticatedUser, getAllInvitation);

export default userRoutes;
