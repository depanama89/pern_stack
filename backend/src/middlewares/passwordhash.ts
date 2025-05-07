import bcrypt from "bcrypt";
import { log } from "console";
import { NextFunction } from "express";
import JWT from "jsonwebtoken";
import env from "../util/validateEnv"

interface HashpasswordProps {
  password: string;

}

export const hashPassword = async ({ password }: HashpasswordProps):Promise<string> => {
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};


interface comparePasswordProps{
  userPassword: string,
  password: string,
}
export const comparePassword = async (
  { userPassword, password }: comparePasswordProps
)=> {
  try {
    const isMatch = await bcrypt.compare(password,userPassword);
     // No return value - just call next()
     return isMatch
  } catch (error) {
    console.log(error);
    
  }
};
interface createJWTProps{
  id:number
}
export const createJWT=({id}: createJWTProps)=>{
  return JWT.sign({
    userId:id
  },
env.JWT_SECRET,
{
  expiresIn:"1d"
})
}
