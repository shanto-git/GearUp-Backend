import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { gearController } from "./gear.controller";


const router = Router();

router.post("/gear", auth(Role.PROVIDER), gearController.createGearItem)

export const gearItemRoute = router;