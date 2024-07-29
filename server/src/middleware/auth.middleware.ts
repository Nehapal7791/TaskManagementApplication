import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const blacklist: string[] = [];

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  if (blacklist.includes(token)) {
    return res.status(401).json({ message: "Token has been invalidated." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.body = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

export const invalidateToken = (token: string) => {
  blacklist.push(token);
};
