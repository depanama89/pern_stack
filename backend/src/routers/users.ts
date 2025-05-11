import express from "express"
import * as UserControllers from "../controllers/users"

const router=express.Router()



router.get("/",UserControllers.getAllUsers)
router.get("/:id",UserControllers.getAllUserId)
router.patch("/:id",UserControllers.update)

export default router