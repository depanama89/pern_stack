import bcrypt from "bcrypt";
import { log } from "console";
import { NextFunction } from "express";
import JWT from "jsonwebtoken";
import env from "../util/validateEnv"

interface HashpasswordProps {
  password?: string;

}

export const hashPassword=async({password}:HashpasswordProps)=>{
  if (password === undefined || password === null) {
    throw new Error('Le paramètre password est requis');
  }
  // const salt = await bcrypt.hash(password,10)
   // 2. Hachage sécurisé
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Vérification du résultat
    if (!hashedPassword) {
      throw new Error('Erreur lors de la génération du hash');
    }

    return hashedPassword;
  } catch (error) {
    console.error('Erreur de hachage:', {
      error,
      inputType: typeof password,
      inputLength: password?.length
    });
    throw new Error('Échec du cryptage du mot de passe');
  }

}

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
  id:string
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
