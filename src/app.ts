import cookieParser from "cookie-parser";
import express, { Application } from "express";


const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


export default app;