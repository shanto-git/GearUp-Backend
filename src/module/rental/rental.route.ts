import { Router } from "express";
import { rentalController } from "./rental.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(Role.CUSTOMER), rentalController.createRentalOrder);
router.get("/", auth(), rentalController.getMyAllRental);
router.get("/orders",auth(Role.PROVIDER), rentalController.getProviderIncomingOrder)
router.get("/:id", auth(), rentalController.getMyRental);

export const renalRoute = router;
