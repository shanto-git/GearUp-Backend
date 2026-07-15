import cookieParser from "cookie-parser";
import express, { Application } from "express";
import cors from "cors";
import config from "./config";
import { authRoutes } from "./module/auth/auth.route";
import { userRoute } from "./module/user/user.route";
import { gearItemRoute } from "./module/gearItem/gear.route";
import { rentalRoute } from "./module/rental/rental.route";
import { categoryRoute } from "./module/category/category.route";
import { adminRoute } from "./module/admin/admin.route";
import { reviewRoutes } from "./module/reviews/reviews.route";
import { paymentRoute } from "./module/payment/payment.route";
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";

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

app.use("/api/admin", adminRoute)
app.use("/api/provider", gearItemRoute, rentalRoute);
app.use("/api/auth", authRoutes, userRoute);
app.use("/api", gearItemRoute);
app.use("/api/categories", categoryRoute)
app.use("/api/rentals", rentalRoute)
app.use("/api/reviews", reviewRoutes)
app.use("/api/payments", paymentRoute)

app.use(notFound)
app.use(globalErrorHandler)

export default app;
