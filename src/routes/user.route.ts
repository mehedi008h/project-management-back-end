import { Router } from "express";
import {
    checkSendInvitation,
    getAllInvitation,
    getAllUsers,
    sendInvitation,
} from "../controllers/user.controller";
import { isAuthenticatedUser } from "../middlewares/auth";

const userRoutes = Router();

userRoutes.route("/").get(isAuthenticatedUser, getAllUsers);
userRoutes.route("/send-invitation").put(isAuthenticatedUser, sendInvitation);
userRoutes.route("/invitation").get(isAuthenticatedUser, getAllInvitation);
userRoutes
    .route("/check-invitation/:id")
    .get(isAuthenticatedUser, checkSendInvitation);

export default userRoutes;
