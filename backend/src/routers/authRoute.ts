import express from "express"
import * as AuthController from "../controllers/auth"

const router=express.Router()

router.post("/sign-up",AuthController.signUpUser)
router.post("/log-in",AuthController.logInUser)


export default router