import { Router } from "express";
import {
    loggedInUser,
    loginUser,
    logout,
    registerUser,
} from "../controllers/auth.controller";
import { isAuthenticatedUser } from "../middlewares/auth";

const authRoutes = Router();

authRoutes.route("/register").post(registerUser);
authRoutes.route("/login").post(loginUser);
authRoutes.route("/me").get(isAuthenticatedUser, loggedInUser);
authRoutes.route("/logout").get(logout);

export default authRoutes;
