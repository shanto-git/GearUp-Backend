import cookieParser from "cookie-parser";
import express, { Application } from "express";
import { userRoutes } from "./module/user/user.route";
import cors from "cors";
import config from "./config";


const app: Application = express();

app.use(cors({
    origin: config.app_url,
    credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", userRoutes)


export default app;