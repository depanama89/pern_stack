import { RequestHandler } from "express";

export const getAllTransactions:RequestHandler=async (req,res,next)=>{
    res.send("hello,transactions")
}