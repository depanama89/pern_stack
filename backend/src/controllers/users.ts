import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { pool } from "../db/db";
import bcrypt from "bcrypt";

export const getAllUsers: RequestHandler = async (req, res, next) => {
  res.send("hello,wordl");
};

interface SignUpUserProps {
  email: string;
  firstname: string;
  lastname: string;
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
    firstname,
    lastname,
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
        firstname ||
        email ||
        lastname ||
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

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await pool.query(
      `INSERT INTO tbluser (
        email, firstname, lastname, contact, 
        accounts, password, provider, country, currency
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, email, firstname, lastname, contact, accounts, provider, country, currency`,
      [
        email,
        firstname,
        lastname,
        contact,
        accounts,
        hashedPassword,
        provider,
        country,
        currency,
      ]
    );

    // const {password:- ,...userWithoutPassword}=newUser.rows[0]

    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    next(error);
  }
};

interface LogInUserProps {
  email: string;
  password: string;
}

export const logInUser: RequestHandler<
  unknown,
  unknown,
  LogInUserProps,
  unknown
> = async (req, res, next) => {};
