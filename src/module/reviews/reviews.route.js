import { Router } from "express";
import { auth } from "../../middleware/auth";
import { reviewController } from "./reviews.controller";
const router = Router();
router.post("/", auth(), reviewController.createReview);
export const reviewRoutes = router;
