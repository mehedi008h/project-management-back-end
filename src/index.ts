import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import ip from "ip";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

const PORT = process.env.SERVER_PORT || 5000;

app.get("/ping", (request: Request, response: Response) => {
    response.send("Pong");
});

app.listen(PORT, () => {
    console.log(`Application is running on: ${ip.address()} : ${PORT}`);
});
