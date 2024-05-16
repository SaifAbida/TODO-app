import {
  getList,
  getOneItem,
  updateItem,
  deleteItem,
  createItem,
} from "../controllers/listControllers";
import express from "express";
import { VerfiyLogin } from "../middlewares/VerifyLogin";

export const listRouter = express.Router();

listRouter.get("/", VerfiyLogin, getList);
listRouter.post("/", VerfiyLogin, createItem);
listRouter.get("/:id", VerfiyLogin, getOneItem);
listRouter.patch("/:id", VerfiyLogin, updateItem);
listRouter.delete("/:id", VerfiyLogin, deleteItem);
