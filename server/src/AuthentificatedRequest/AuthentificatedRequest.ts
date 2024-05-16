import { Request } from "express";

interface userInterface {
  id: string
}

export interface AuthentificatedRequest extends Request {
  user: userInterface;
}
