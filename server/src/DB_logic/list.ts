import { pool } from "..";

export const getAll = async (user_id: string) => {
  const [list] = await pool.query(`SELECT * FROM todo.list WHERE user_id = ?`, [
    user_id,
  ]);
  return list;
};

export const getOne = async (user_id: string, item_id: string) => {
  const [item] = await pool.query(
    `SELECT * FROM todo.list WHERE user_id = ? AND item_id = ?`,
    [user_id, item_id]
  );
  return item[0];
};

export const create = async (user_id: string, content: string) => {
  await pool.query(`INSERT INTO todo.list (content, user_id) VALUES (?,?)`, [
    content,
    user_id,
  ]);
  return getAll(user_id);
};

export const updateOne = async (
  user_id: string,
  item_id: string,
  content: string
) => {
  await pool.query(
    `UPDATE todo.list SET content = ? WHERE user_id = ? AND item_id = ?`,
    [content, user_id, item_id]
  );
  return getAll(user_id);
};

export const deleteOne = async (user_id: string, item_id: string) => {
  await pool.query(`DELETE FROM todo.list WHERE user_id = ? AND item_id = ?`, [
    user_id,
    item_id,
  ]);
  return getAll(user_id);
};
