import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const jwt_secret =
  "vckldsbcguydesdckhdsfcudscdsvy546yhjdbsU%^$%^TFHEb3f2tkedbh";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "A token is required for authentication",
    });
  }
  try {
    const decoded = jwt.verify(token, jwt_secret);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
  return next();
};
