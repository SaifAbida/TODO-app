import { create, getOne, getAll, updateOne, deleteOne } from "../DB_logic/list";
import { Response } from "express";
import { AuthentificatedRequest } from "../AuthentificatedRequest/AuthentificatedRequest";

export const getList = async (req: AuthentificatedRequest, res: Response) => {
  try {
    const list = await getAll(req.user.id);
    res.status(200).send(list);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unexpected error occurred");
  }
};

export const getOneItem = async (
  req: AuthentificatedRequest,
  res: Response
) => {
  try {
    const item = await getOne(req.user.id, req.params.id);
    if (!item) {
      return res.status(400).send("Item not found");
    }
    res.status(200).send(item);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unexpected error occurred");
  }
};

export const createItem = async (
  req: AuthentificatedRequest,
  res: Response
) => {
  try {
    const { content } = req.body;
    const item = await create(req.user.id, content);
    res.status(200).send(item);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unexpected error occurred");
  }
};

export const updateItem = async (
  req: AuthentificatedRequest,
  res: Response
) => {
  try {
    const { content } = req.body;
    const newList = await updateOne(req.user.id, req.params.id, content);
    res.status(200).send(newList);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unexpected error occurred");
  }
};

export const deleteItem = async (
  req: AuthentificatedRequest,
  res: Response
) => {
  try {
    const newList =  await deleteOne(req.user.id, req.params.id);
    res.status(200).send(newList);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unexpected error occurred");
  }
};
