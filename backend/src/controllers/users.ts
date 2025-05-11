import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { pool } from "../db/db";
import bcrypt from "bcrypt";
import {
  comparePassword,
  createJWT,
  hashPassword,
} from "../middlewares/passwordhash";

export const getAllUsers: RequestHandler = async (req, res, next) => {
  res.send("hello,wordl");
};

export const getAllUserId:RequestHandler = async (req,res,next)=>{

}

interface updateProps{
  username:string
  firstName:string  
}


export const update:RequestHandler<unknown,unknown,updateProps,unknown>=async(req,res,next)=>{

}
