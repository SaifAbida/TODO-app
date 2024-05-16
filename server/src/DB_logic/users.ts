import { pool } from "..";
import { CreateUserType, UpdateUserType } from "../types";

export const create = async (user: CreateUserType) => {
  await pool.query(
    `INSERT INTO todo.users (username,email,password) VALUES (?,?,?)`,
    [user.username, user.email, user.password]
  );
};

export const getOne = async (user_id: string) => {
  const [user] = await pool.query(
    `SELECT * FROM todo.users WHERE user_id = ?`,
    [user_id]
  );
  return user[0];
};

export const getbyUsername = async (username: string) => {
  const [user] = await pool.query(
    `SELECT * FROM todo.users WHERE username = ?`,
    [username]
  );
  return user[0];
};

export const updateOne = async (user_id: string, user: UpdateUserType) => {
  await pool.query(
    `UPDATE todo.users SET username = ?, email = ? WHERE user_id = ?`,
    [user.username, user.email, user_id]
  );
};

export const updatePassword = async (user_id: string, password: string) => {
  await pool.query(`UPDATE todo.users SET password = ? WHERE user_id = ?`, [
    password,
    user_id,
  ]);
};

export const deleteOne = async (user_id: string) => {
  await pool.query(`DELETE FROM todo.users WHERE user_id = ?`, [user_id]);
};
