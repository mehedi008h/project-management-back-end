import { Router } from "express";
import {
    acceptInvitation,
    checkSendInvitation,
    getAllInvitation,
    getAllTeamMates,
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
userRoutes
    .route("/accept-invitation")
    .put(isAuthenticatedUser, acceptInvitation);
userRoutes.route("/team-mates").get(isAuthenticatedUser, getAllTeamMates);

export default userRoutes;
