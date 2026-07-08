import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { userController } from "./user.controller";

const router = Router();


router.get("/me", auth(Role.ADMIN,Role.CUSTOMER,Role.PROVIDER), userController.getMyProfile);

router.put("/my-profile", auth(Role.ADMIN,Role.CUSTOMER,Role.PROVIDER), userController.updateMyProfile);

router.get("/users", auth(Role.ADMIN), userController.getAllUsers);
router.patch("/users/:id", auth("ADMIN"), userController.updateUserStatus);

export const userRoute = router