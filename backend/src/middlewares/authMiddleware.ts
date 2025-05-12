import { NextFunction, Response, Request, RequestHandler } from "express";
import JWT from "jsonwebtoken";
import env from "../util/validateEnv";

// Extension du type Request d'Express
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
      };
    }
  }
}


const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      res.status(401).json({
        status: "auth_failed",
        message: "Authentication failed",
      });
      return;
    }
    const token = authHeader.split(" ")[1];


    const userToken = JWT.verify(token, env.JWT_SECRET) as { userId: string };
    // console.log(userToken);
    
    if (!userToken.userId) {
        console.log('Token malformé',userToken);
        
      throw new Error("Token malformé: userId manquant");
    }
    req.user = {
      userId: userToken.userId,
    };


    next();
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ status: "auth_failed", message: "Token JWT invalide" });
  }
};
export default authMiddleware;
