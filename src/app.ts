import cookieParser from "cookie-parser";
import express, { Application } from "express";
import cors from "cors";
import config from "./config";
import { authRoutes } from "./module/auth/auth.route";
import { userRoute } from "./module/user/user.route";
import { gearItemRoute } from "./module/gearItem/gear.route";


const app: Application = express();

app.use(cors({
    origin: config.app_url,
    credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes, userRoute)
app.use("/api/provider", gearItemRoute)


export default app;