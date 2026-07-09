import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/auth";
import { adminController } from "./admin.controller";


const router = Router()

router.get("/users", auth(Role.ADMIN), adminController.getAllUsers);
router.patch("/users/:id", auth("ADMIN"), adminController.updateUserStatus);
router.get("/gear", auth(Role.ADMIN), adminController.getAllGear)


export const adminRoute = router