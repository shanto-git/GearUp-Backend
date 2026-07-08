import { Router } from "express";
import { rentalController } from "./rental.controller";

const router = Router();

router.post("/", rentalController.createRentalOrder);

export const renalRoute = router;
