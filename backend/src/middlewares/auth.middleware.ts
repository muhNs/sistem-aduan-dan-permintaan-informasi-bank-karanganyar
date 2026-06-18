import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../config/auth.helper.js";
import type { AppJwtPayload } from "../types/type.jwt.js";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // let token: string | undefined;
    const token = req.cookies.accessToken
    // if (req.cookies.accessToken) token = req.cookies.accessToken as string;
    
    if (!token) {
      return res.status(401).json({ message: "Token tidak ditemukan" });
    }

    const decoded = verifyToken(token) as AppJwtPayload;
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid authHeader" });
  }
};
