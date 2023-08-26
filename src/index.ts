import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import ip from "ip";
import cookieParser from "cookie-parser";

import { connectDatabase } from "./config/database";
import { Code } from "./enum/code.enum";
import { Status } from "./enum/status.enum";
import { HttpResponse } from "./domain/response";
import { errorMiddleware } from "./middlewares/error";
import projectRoutes from "./routes/project.route";
import taskRoutes from "./routes/task.route";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";

const app = express();
dotenv.config();

// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.SERVER_PORT || 5000;

// connect to database
connectDatabase();

// routes
app.use("/api/v1/project", projectRoutes);
app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.get("/", (request: Request, response: Response) => {
    response
        .status(Code.OK)
        .send(
            new HttpResponse(
                Code.OK,
                Status.OK,
                "Welcome to Project Management Server 👍."
            )
        );
});

// not found routes
app.all("*", (request: Request, response: Response) => {
    response
        .status(Code.NOT_FOUND)
        .send(
            new HttpResponse(
                Code.NOT_FOUND,
                Status.NOT_FOUND,
                "Route does not exist on this server 🚩."
            )
        );
});

app.use(errorMiddleware);

// listning port
app.listen(PORT, () => {
    console.log(`Application is running on: ${ip.address()} : ${PORT}`);
});
