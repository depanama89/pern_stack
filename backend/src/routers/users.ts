import express from "express"
import * as UserControllers from "../controllers/users"

const router=express.Router()



router.get("/",UserControllers.getAllUsers)
router.get("/:id",UserControllers.getAllUserId)
router.patch("/change-password",UserControllers.changePassword)

router.patch("/:id",UserControllers.updateUser)

export default router