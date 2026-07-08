import cookieParser from "cookie-parser";
import express, { Application } from "express";
import cors from "cors";
import config from "./config";
import { authRoutes } from "./module/auth/auth.route";
import { userRoute } from "./module/user/user.route";
import { gearItemRoute } from "./module/gearItem/gear.route";
import { renalRoute } from "./module/rental/rental.route";
import { categoryRoute } from "./module/category/category.route";

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/admin", userRoute)
app.use("/api/provider", gearItemRoute, renalRoute);
app.use("/api/auth", authRoutes, userRoute);
app.use("/api", gearItemRoute);
app.use("/", categoryRoute)
app.use("/api/rentals", renalRoute)

export default app;
