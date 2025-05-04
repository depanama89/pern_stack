import express from "express"
import * as UserControllers from "../controllers/users"

const router=express.Router()



router.get("/",UserControllers.getAllUsers)
router.post("/sign-up",UserControllers.signUpUser)
router.post("/log-in",UserControllers.logInUser)

export default router