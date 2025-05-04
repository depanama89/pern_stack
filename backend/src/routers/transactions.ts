import express from "express"
import * as transactionController from "../controllers/transactions"

const router=express.Router()

router.get("/",transactionController.getAllTransactions)

export default router