import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { gearController } from "./gear.controller";


const router = Router();

router.post("/gear", auth(Role.PROVIDER), gearController.createGearItem)
router.get("/gear", gearController.getAllGearItems)
router.put("/gear/:id", auth(Role.PROVIDER), gearController.updateGearItem)
router.delete("/gear/:id", auth(Role.PROVIDER), gearController.deleteGearItem)


export const gearItemRoute = router;