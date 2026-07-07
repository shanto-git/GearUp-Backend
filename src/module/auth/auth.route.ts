import { Router } from "express";
import { authController } from "./auth.controller";


const router = Router();

router.post("/register",authController.registerUser);
router.get("/login",authController.loginUser)


export const authRoutes = router;