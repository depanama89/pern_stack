import { RequestHandler } from "express";
import { pool } from "../db/db";
import createHttpError from "http-errors";

export const getAllAccounts: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.user!;

    const accounts = await pool.query({
      text: `SELECT * FROM tblaccount user_id=$1`,
      values: [userId],
    });

    res.status(200).json({
      status: "success",
      data: accounts.rows,
    });
  } catch (error) {
    console.log(error);

    // next(createHttpError(500, "impossiblee d'afficher les comptes"));
  }
};

export const createAccounts: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.user!;

    const { name, amount, account_number } = req.body;

    const accountExistQuery = {
      text: `SELECT * FROM tblaccount WHERE account_name=$1 AND user_id=$2`,
      values: [name, userId],
    };

    const accountExitResult = await pool.query(accountExistQuery);

    const accountExist = accountExitResult.rows[0];

    if (accountExist) {
      res.status(409).json({
        status: "failed",
        message: "Account already created.",
      });
      return
    }

    const createAccountsResult = await pool.query({
      text: `INSERT INTO tblaccount (user_id,account_name,account_number,account_balance) VALUES($1,$2,$3,$4) RETURNING *`,
      values: [userId, name, account_number, amount],
    });

    const account = createAccountsResult.rows[0];
    const userAccounts = Array.isArray(name) ? name : [name];
    const updateUserAccountQuery = {
      text: `UPDATE tbluser SET accounts=array_cat(accounts,$1),updatedat=CURRENT_TIMESTAMP WHERE id=$2 RETURNING *`,
      values: [userAccounts, userId],
    };

    await pool.query(updateUserAccountQuery);
    const description = account.account_name + " (Initial Deposit)";

    const initialDepositQuery = {
      text: `INSERT INTO tbltransaction(user_id, description, type, status, amount, source) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
      values: [
        userId,
        description,
        "income",
        "Completed",
        amount,
        account.account_name,
      ],
    };
    await pool.query(initialDepositQuery);

    res.status(201).json({
      status: "success",
      message: account.account_name + " Account created successfully",
      data: account,
    });
  } catch (error) {
    console.log(error);
    next(createHttpError(500,"impossible de créer un compte"))
    
  }
};

export const addMoneyToAccount: RequestHandler = async (req, res, next) => {
  try {
    const {userId } = req.user!
    const {id}=req.params
    const {amount} = req.body

    const newAmount =Number(amount)

    const result = await pool.query({
      text: `UPDATE tblaccount SET account_balance =(account_balance + $1), updatedat = CURRENT_TIMESTAMP  WHERE id = $2 RETURNING *`,
      values: [newAmount, id],
    });

    const accountInformation = result.rows[0];

    const description = accountInformation.account_name + " (Deposit)";

    const transQuery = {
      text: `INSERT INTO tbltransaction(user_id, description, type, status, amount, source) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
      values: [
        userId,
        description,
        "income",
        "Completed",
        amount,
        accountInformation.account_name,
      ],
    };
    await pool.query(transQuery);

    res.status(200).json({
      status: "success",
      message: "Operation completed successfully",
      data: accountInformation,
    });
  } catch (error) {
    console.log(error);
    next(createHttpError(500,"Impossible d'ajouter de l'argent"))
  }
  
};
