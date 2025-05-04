import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const getAllUsers:RequestHandler=async(req,res,next)=>{

    res.send("hello,wordl")

}

interface SignUpUserProps{
    email:string
    firstname :string
    lastname :string 
    contact :string 
    accounts :string 
    password :string 
    provider:string  
    country :string  
    currency:string  
    
}

export const signUpUser:RequestHandler<unknown,unknown,SignUpUserProps,unknown>=async(req,resizeBy,next)=>{

    const {email,firstname,lastname,contact,accounts,password,provider,country,currency}=req.body
try {

    
    if(!(firstname || email || lastname || contact || accounts || password ||  provider || country ||  currency)){
        throw next(createHttpError(400,"remplir les champs vide"))
    }
    
    
} catch (error) {
    next(error)
}
}

interface LogInUserProps{
    email:string
    password :string

}

export const logInUser:RequestHandler<unknown,unknown,LogInUserProps,unknown>=async(req,res,next)=>{

}