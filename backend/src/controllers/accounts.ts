import { RequestHandler } from "express";

 export const getAllAccounts:RequestHandler=async(req,res,next)=>{
res.send("hello,accounts")
}