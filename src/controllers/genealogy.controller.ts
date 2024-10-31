import {Response,Request} from "express"
import mongoose from "mongoose"
const Member = require("../models/member.model");



const getFamilyTree = async (req:Request, res:Response) => {
  try {
    const familyTree = await Member.find({});

    if (!familyTree[0]) {
      return res.status(400).send("Member doesn't exist,Create some");
    }
    res.status(200).send(familyTree);

  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
const AddFamilyMember = async (req:Request, res:Response) => {
  try {
    const { name, email, phone, dateOfBirth, placeOfResidence } = req.body;

    if (!email || !name || !placeOfResidence || !dateOfBirth || !phone) {
      return res.status(400).json({ message: "please fill in all fields" });
    }
    const newMember = new Member({
      name: name,
      email: email,
      phoneNumber: phone,
      dateOfBirth: dateOfBirth,
      placeOfResidence: placeOfResidence,
    });
    await newMember.save();
    res.status(200).send({ newMember });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
const AddParents = async (req:Request, res:Response) => {
  try {
    const { childId, father, mother } = req.body;
    if (!childId || !father || !mother) {
      return res.status(400).json({ message: "please fill in all fields" });
    }
    const findFather = await Member.findOne({ name: father });
    if (!findFather) {
      return res.status(400).json({ message: "input a valid father Name" });
    }
    const findMother = await Member.findOne({ name: mother });
    if (!findMother) {
      return res.status(400).json({ message: "input a valid mother Name" });
    }
    const findChild = await Member.findById(childId);

    console.log(findChild)
    
    findChild.father = findFather._id;
    findChild.mother = findMother._id;
    await findChild.save();

    res.status(200).json({ message: "Added parents" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  getFamilyTree,
  AddFamilyMember,
  AddParents,
};
