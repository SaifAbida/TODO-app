import { AuthentificatedRequest } from "../AuthentificatedRequest/AuthentificatedRequest";
import {
  create,
  updateOne,
  deleteOne,
  getOne,
  getbyUsername,
  updatePassword,
} from "../DB_logic/users";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    await create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    res.status(200).send("User created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unexpected error occurred");
  }
};

export const getUser = async (req: AuthentificatedRequest, res: Response) => {
  try {
    const user = await getOne(req.user.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unexpected error occurred");
  }
};

export const updateUser = async (
  req: AuthentificatedRequest,
  res: Response
) => {
  const { username, email } = req.body;
  try {
    await updateOne(req.user.id, { username, email });
    res.status(200).send("User updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unexpected error occurred");
  }
};

export const resetPassword = async (
  req: AuthentificatedRequest,
  res: Response
) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const user = await getOne(req.user.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const verifyCurrentPassword = bcrypt.compareSync(
      currentPassword,
      user.password
    );
    if (!verifyCurrentPassword) {
      return res.status(400).send("Your current password is incorrect");
    }
    const verifyNewPassword = bcrypt.compareSync(newPassword, user.password);
    if (verifyNewPassword) {
      return res
        .status(400)
        .send("You cannot set the new password to the current password");
    }
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .send("The new password and the confirmation are not matching");
    }
    const salt = bcrypt.genSaltSync(10)
    const hashedNewPassword = bcrypt.hashSync(newPassword,salt)
    await updatePassword(req.user.id, hashedNewPassword);
    res.status(200).send("Password changed successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unexpected error occurred");
  }
};

export const deleteUser = async (
  req: AuthentificatedRequest,
  res: Response
) => {
  try {
    await deleteOne(req.user.id);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unexpected error occurred");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const existingUser = await getbyUsername(req.body.username);
    if (!existingUser) {
      return res.status(404).send("User not found");
    }
    const verifyPassword = bcrypt.compareSync(
      req.body.password,
      existingUser.password
    );
    if (!verifyPassword) {
      return res.status(404).send("Incorrect password");
    }
    const token = jwt.sign(
      { user_id: existingUser.user_id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "24h" }
    );
    res.status(200).send(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unexpected error occurred");
  }
};
