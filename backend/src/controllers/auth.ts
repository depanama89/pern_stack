import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { pool } from "../db/db";
import bcrypt from "bcrypt";
import {
  comparePassword,
  createJWT,
  hashPassword,
} from "../middlewares/passwordhash";
import env from "../util/validateEnv"

// export const getAllUsers: RequestHandler = async (req, res, next) => {
//   res.send("hello,wordl");
// };

interface SignUpUserProps {
  email: string;
  firstName: string;
  lastName: string;
  contact: string;
  accounts: string;
  password: string;
  provider: string;
  country: string;
  currency: string;
}
const saltRounds = 10;

export const signUpUser: RequestHandler<
  unknown,
  unknown,
  SignUpUserProps,
  unknown
> = async (req, res, next) => {
  const {
    email,
    firstName,
    lastName,
    contact,
    accounts,
    password,
    provider,
    country,
    currency,
  } = req.body;
  try {
    if (
      !(
        firstName ||
        email ||
        lastName ||
        contact ||
        accounts ||
        password ||
        provider ||
        country ||
        currency
      )
    ) {
      throw next(createHttpError(400, "remplir les champs vide"));
    }

    const userExist = await pool.query({
      text: "SELECT EXISTS (SELECT* FROM tbluser WHERE email=$1)",
      values: [email],
    });

    if (userExist.rows[0].exists) {
      throw next(createHttpError(400, "c'est utilisateur existe deja !"));
    }

    // const hashedPassword = await bcrypt.hash(password, saltRounds);
    const hashedPassword = await hashPassword({ password });

    const newUser = await pool.query(
      `INSERT INTO tbluser (
        email, firstName, lastName, contact, 
        accounts, password, provider, country, currency
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, email, firstName, lastName, contact, accounts, provider, country, currency`,
      [
        email,
        firstName,
        lastName,
        contact,
        accounts,
        hashedPassword,
        provider,
        country,
        currency,
      ]
    );

    // const {password:- ,...userWithoutPassword}=newUser.rows[0]
    //   newUser.rows[0].password=undefined
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    next(error);
  }
};

interface LogInUserProps {
  email?: string;
  password?: string;
}

export const logInUser: RequestHandler<
  unknown,
  unknown,
  LogInUserProps,
  unknown
> = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw createHttpError(400, "Email and password are required");
    }

    const result = await pool.query({
      text: `SELECT*FROM tbluser WHERE email=$1`,
      values: [email],
    });

    const user = result.rows[0];
// console.log(user);

    if (!user) {
      throw createHttpError(401, "Invalid email and password");
    }

    // Comparaison des mots de passe (avec logs pour débogage)
    // console.log("Comparaison entre:", {
    //     inputPassword: password,
    //     storedHash: user.password
    //   });

    const isMatch = await comparePassword({
      userPassword: user?.password,
      password:password,
    });

    if (!isMatch) {

      throw createHttpError(401, "mot de passe ne correspond");
    }

    const token = createJWT({id:user.id});

    res.cookie('token',token,{
      httpOnly:true,
      secure:env.NODE_ENV==='production',
      sameSite:'strict',
      maxAge:86400*1000
    })
    //   pour n'est pas retourné le mot de passe

    user.password = undefined;

    res.status(200).json({
      message: "Login successFully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    
    next(error);
  }
};
