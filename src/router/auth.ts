import {Router, Request} from 'express'
require("dotenv").config();
import jwt from "jsonwebtoken";
import {verifyToken} from "../middleware/auth";

interface IGetUserAuthInfoRequest extends Request {
  user: {
      id:number,
      email:string
  }
}
const router = Router();

import {data} from "../data";

router.get("/", verifyToken, (req:IGetUserAuthInfoRequest, res) => {

    let {id} = req.user;
    let user = data.filter(item => item.id == id);
   
    if(user.length>0){
        
        delete user[0].password;

        res.status(200).json({
            success:true,
            message:'User found',
            data:user[0]
        });
    }else{
        res.status(404).json({
            success:false,
            message:"User not found"
        });
    }
    
  });

router.post("/login", (req, res)=> {
	const { email, password } = req.body;
    if(!email || !password) 
        res.status(400).json({
            success:false,
            message:'Please fill all reqired fields'
        });
    else{
        let token;
        for(let i =0 ; i<data.length; ++i){
            if(data[i].email === email && data[i].password === password)
            {
                token = jwt.sign(
                    { id: data[i].id, email },
                    process.env.jwt_secret,
                    {
                      expiresIn: "2h",
                    }
                  );
                  break;
            }
        }
        if(token) res.status(200).json({
            success:true,
            message:'Logged in succesfully',
            token
        });
        else res.status(400).json({
            success:false,
            message:'Email or password is incorrect'
        });
    }
});

export default router