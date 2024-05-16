import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
import { listRouter } from "./routes/listRoutes";
import { userRouter } from "./routes/userRoutes";

const app = express();
dotenv.config();
export const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    database: process.env.BD_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  })
  .promise();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use("/list", listRouter);
app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
