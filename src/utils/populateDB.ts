import { Member } from "../models/member.model";
import mongoose from "mongoose";
import { initialParents } from "./data";
import {Response,Request} from "express"


export const populateDB = async () => {
  try {
    const data = await Member.find({});
    if (data[0]) {
      return;
    }
    await Member.create(initialParents)
  } catch (error) {
    console.log(error)
  }
};
