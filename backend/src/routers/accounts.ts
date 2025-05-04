import express from "express"
import * as accountsController from "../controllers/accounts"

const router=express.Router()

router.get("/",accountsController.getAllAccounts)


export default router