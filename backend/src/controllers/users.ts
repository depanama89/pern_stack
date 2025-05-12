import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { pool } from "../db/db";
import bcrypt from "bcrypt";
import {
  comparePassword,
  createJWT,
  hashPassword,
} from "../middlewares/passwordhash";

import JWT from "jsonwebtoken";
import env from "../util/validateEnv";

// export function generateAuthToken(userId: string) {
//   // Ajoutez explicitement userId au payload
//   const token = JWT.sign(
//     {
//       userId: userId, // Ce champ est essentiel
//       // autres données si nécessaire
//     },
//     env.JWT_SECRET,
//     { expiresIn: "24h" } // Exemple: expiration en 24 heures
//   );

//   return token;
// }

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user?.userId) {
      throw createHttpError(401, "Authentication required");
    }
    

    const usersResults = await pool.query({
      text: `SELECT id, firstname, lastname, email, country, currency, contact FROM tbluser`,
    });

    const users = usersResults.rows;

    res.status(200).json({
      status: "success",
      count: users.length,
      data: users,
    });
    
  } catch (error) {
    next(error);
  }
};

export const changePassword: RequestHandler = async (req, res, next) => {
  try {
    // 1. Vérification complète de req.user
    if (!req.user || !req.user.userId) {
      
      throw createHttpError(401, "Authentification invalide");
    }

   
    const { userId } = req.user;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // 2. Validation des données d'entrée
    if (!currentPassword || !newPassword || !confirmPassword) {
      throw createHttpError(400, "Tous les champs sont requis");
    }

    // const user = userExist.rows[0];

    

    if (newPassword !== confirmPassword) {
      res.status(401).json({
        status: "failed",
        message: "New Passwords does not match",
      });
    }

    const userExist = await pool.query({
      text: `SELECT * FROM tbluser WHERE id=$1`,
      values: [userId],
    });

    if (userExist.rowCount === 0) {
      throw createHttpError(404, "Utilisateur non trouvé");
    }

    const user = userExist.rows[0];

    const isMatch = comparePassword({
      userPassword: user.password,
      password: currentPassword,
    });

    if (!isMatch) {
      throw next(createHttpError(401, "Invalid current password"));
    }

    const hashedPassword = await hashPassword({password:newPassword});

    const NewUserPassword = await pool.query({
      text: `UPDATE tbluser SET password=$1 WHERE id=$2`,
      values: [hashedPassword, userId],
    });

    res.status(200).json({
      status: "success",
      message: "Mot de passe mise à jour",
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const getAllUserId: RequestHandler = async (req, res, next) => {};

interface updateProps {
  firstname: string;
  lastname: string;
  country: string;
  currency: string;
  contact: string;
}

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.user!;

    const { firstname, lastname, country, currency, contact } = req.body;

    const userExist = await pool.query({
      text: ` SELECT * FROM tbluser WHERE id=$1`,
      values: [userId],
    });

    const user = userExist.rows[0];

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const updatedUser = await pool.query({
      text: `UPDATE tbluser SET firstname=$1,lastname=$2,country=$3,currency=$4, contact=$5,updatedat=CURRENT_TIMESTAMP WHERE id=$6 RETURNING * `,
      values: [firstname, lastname, country, currency, contact, userId],
    });

    updatedUser.rows[0].password = undefined;

    res.status(200).json({
      status: "success",
      message: "user information updateed successfully",
      user: updatedUser.rows[0],
    });
  } catch (error) {
    next(error);
  }
};
