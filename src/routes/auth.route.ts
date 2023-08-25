import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.route("/register").post(registerUser);
authRoutes.route("/login").post(loginUser);

export default authRoutes;
