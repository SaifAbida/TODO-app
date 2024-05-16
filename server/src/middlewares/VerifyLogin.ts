import { AuthentificatedRequest } from "../AuthentificatedRequest/AuthentificatedRequest";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const VerfiyLogin = (
  req: AuthentificatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).send("You are not authorized");
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET_KEY
    ) as jwt.JwtPayload;
    if (!req.user) {
      req.user = {
        id: "",
      };
    }
    req.user.id = decoded.user_id;
    next()
  } catch (error) {
    console.error(error);
    res.status(500).send("Unexpected error occurred");
  }
};
