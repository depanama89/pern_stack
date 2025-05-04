import bcrypt from "bcrypt";
import { log } from "console";
import { NextFunction } from "express";
import JWT from "jsonwebtoken";

interface HashpasswordPorops {
  userValue: string;
}

export const hashPassword = async ({ userValue }: HashpasswordPorops) => {
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(userValue, salt);

  return hashedPassword;
};

export const comparePassword = async (
  userPassword: string,
  password: string,
  next: NextFunction
) => {
  try {
    const isMatch = await bcrypt.compare(userPassword, password);
    return isMatch;
  } catch (error) {
    next(error);
  }
};
