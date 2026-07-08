import { Router } from "express";
import { categoryController } from "./category.controller";


const router = Router();

router.get("/api/categories", categoryController.getAllCategory)


export const categoryRoute = router