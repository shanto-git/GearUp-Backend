import { Router } from "express";
import { rentalController } from "./rental.controller";
import { auth } from "../../middleware/auth";
import { Role } from "@prisma/client";

const router = Router();

router.post("/", auth(Role.CUSTOMER), rentalController.createRentalOrder);
router.get("/", auth(), rentalController.getMyAllRental);
router.get(
  "/orders",
  auth(Role.PROVIDER),
  rentalController.getProviderIncomingOrder,
);
router.patch(
  "/orders/:id",
  auth(Role.PROVIDER),
  rentalController.updateRentalStatus,
);
router.get("/:id", auth(), rentalController.getMyRental);

export const rentalRoute = router;
