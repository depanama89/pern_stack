import express from "express"
import * as transactionController from "../controllers/transactions"

const router=express.Router()

router.get("/",transactionController.getAllTransactions)
router.get("/dashboard",transactionController.getDashboardInformation)
router.post("/add-transaction/:account_id",transactionController.addTransaction)
router.patch("/transfert-money",transactionController.transfertMoneyToAccount)
export default router