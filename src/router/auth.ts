import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { verifyToken, jwt_secret } from "../middleware/auth";
import { IGetUserAuthInfoRequest } from "../types";

const router = Router();

import { data } from "../data";

router.get("/", verifyToken, (req: Request, res: Response) => {
  let { id } = req.user;
  let user = data.filter((item) => item.id == id);

  if (user.length > 0)
    res.status(200).json({
      success: true,
      message: "User found",
      data: {
        id: user[0].id,
        name: user[0].name,
        surname: user[0].surname,
        email: user[0].email,
        age: user[0].age,
        url: user[0].url,
      },
    });
  else
    res.status(404).json({
      success: false,
      message: "User not found",
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    res.status(400).json({
      success: false,
      message: "Please fill all reqired fields",
    });
  else {
    let token;
    for (let i = 0; i < data.length; ++i) {
      if (data[i].email === email && data[i].password === password) {
        token = jwt.sign({ id: data[i].id, email }, jwt_secret, {
          expiresIn: "2h",
        });
        break;
      }
    }
    if (token)
      res.status(200).json({
        success: true,
        message: "Logged in succesfully",
        token,
      });
    else
      res.status(400).json({
        success: false,
        message: "Email or password is incorrect",
      });
  }
});

export default router;
