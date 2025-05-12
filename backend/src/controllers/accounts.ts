import { RequestHandler } from "express";

 export const getAllAccounts:RequestHandler=async(req,res,next)=>{
res.send("hello,accounts")
}

export const createAccounts:RequestHandler=async(req,res,next)=>{
    res.send("create account")
}

export const addMoneyUsers:RequestHandler=async(req,res,next)=>{
    res.send("money")
}