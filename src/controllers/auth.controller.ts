const jwt = require("jsonwebtoken");
import bcrypt  from 'bcrypt';
import { User } from "../models/user.model";
import mongoose from "mongoose"
import {Response,Request,RequestHandler} from "express"
// import jwt from "jsonwebtoken"


export const signup = async (req:Request, res:Response) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;
    if(!name||!email||!password){
      return res.status(400).json({message:" please provide all information"});
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({message:" email already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({message:`User registered successfully,${newUser}`});
  } catch (error) {
    console.log(error);
    res.status(400).json({message:"error logging in"});;
  }
};

export const login = async (req:Request, res:Response) => {
  try {
    const { email, password } = req.body;
    if(!email||!password){
      return res.status(400).json({message:" please provide all information"});
    }
    const isUser = await User.findOne({ email });
    if (!isUser) {
      return res.status(400).json({message:" email doesn't exists"});
    }
    const comparePasswords = await bcrypt.compare(password, isUser.password);
    if (!comparePasswords) {
      return res.status(200).json({message:"Incorrect password"});
    }
    const token = jwt.sign(isUser.id, process.env.SECRETKEY);
    res.status(200).json({ ...isUser, jwttoken: token });
  } catch (error) {
    console.log(error);
    res.status(400).json({message:"error logging in"});
  }
};

module.exports =  {
  signup,
  login,
};
