import express from "express"
import * as accountsController from "../controllers/accounts"

const router=express.Router()

router.get("/",accountsController.getAllAccounts)
router.post("/create",accountsController.createAccounts)
router.patch("/add-money/:id",accountsController.addMoneyUsers)

export default router