import { Router } from "express";
import {
    loggedInUser,
    loginUser,
    registerUser,
} from "../controllers/auth.controller";
import { isAuthenticatedUser } from "../middlewares/auth";

const authRoutes = Router();

authRoutes.route("/register").post(registerUser);
authRoutes.route("/login").post(loginUser);
authRoutes.route("/me").get(isAuthenticatedUser, loggedInUser);

export default authRoutes;
