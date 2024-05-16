import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  login,
  resetPassword
} from "../controllers/userControllers";
import express from "express";
import { VerfiyLogin } from "../middlewares/VerifyLogin";

export const userRouter = express.Router()

userRouter.get("/",VerfiyLogin,getUser)
userRouter.post("/register",createUser)
userRouter.post("/login",login)
userRouter.patch("/update",VerfiyLogin,updateUser)
userRouter.patch("/reset",VerfiyLogin,resetPassword)
userRouter.delete("/",VerfiyLogin,deleteUser)