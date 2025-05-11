import { NextFunction,Response, Request ,RequestHandler } from 'express'
import JWT from 'jsonwebtoken'
import env from "../util/validateEnv"

 const  authMiddleware:RequestHandler =async (req,res,next)=>{

    const authHeader=req.headers.authorization


    if(!authHeader || !authHeader.startsWith("Bearer")){
         res.status(401).json({
            status:"auth_failed",message:"Authentication failed"
        })
        return
    }
    const token =authHeader.split(" ")[1]

    try {
        const userToken = JWT.verify(token,env.JWT_SECRET)

        req.body.user={
            userId:userToken
        }

        next()
        
    } catch (error) {
      console.log(error);
      res.status(401).json({ status:"auth_failed",message:"Authentication failde"})
        
    }
}
export default  authMiddleware