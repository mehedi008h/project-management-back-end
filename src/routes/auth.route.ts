import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.route("/register").post(registerUser);

export default authRoutes;
