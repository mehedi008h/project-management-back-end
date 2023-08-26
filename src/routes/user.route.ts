import { Router } from "express";
import { getAllUsers, sendInvitation } from "../controllers/user.controller";
import { isAuthenticatedUser } from "../middlewares/auth";

const userRoutes = Router();

userRoutes.route("/").get(isAuthenticatedUser, getAllUsers);
userRoutes.route("/send-invitation").post(isAuthenticatedUser, sendInvitation);

export default userRoutes;
