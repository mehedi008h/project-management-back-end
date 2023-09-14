import { Router } from "express";
import {
    forgotPassword,
    loggedInUser,
    loginUser,
    logout,
    registerUser,
    resetPassword,
} from "../controllers/auth.controller";
import { isAuthenticatedUser } from "../middlewares/auth";

const authRoutes = Router();

authRoutes.route("/register").post(registerUser);
authRoutes.route("/login").post(loginUser);
authRoutes.route("/me").get(isAuthenticatedUser, loggedInUser);
authRoutes.route("/logout").get(logout);
authRoutes.route("/password/forgot").post(forgotPassword);
authRoutes.route("/password/reset/:token").post(resetPassword);

export default authRoutes;
