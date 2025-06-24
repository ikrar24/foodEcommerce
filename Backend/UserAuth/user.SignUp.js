import User from "../Database/Models/SignUp.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

// configure Dot Env 

dotenv.config()





const SingUp = async(req , res)=>{
    try {
const {userName , email, password , address, pincode,role} = req.body

if (!userName || !email || !password || !address || !pincode || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }
  





// find/check the user/admin if alredy exits

const userExists = await User.findOne({ email });
if (userExists) {
  return res.status(400).json({ message: "User already registered with this email" });
}

if (role === "admin") {
  const adminExists = await User.findOne({ role: "admin" });
  if (adminExists) {
    return res.status(400).json({ message: "Only one admin allowed" });
  }
}






// hashed password form bcrypt package
const hashedPass = await bcrypt.hash(password , 10);

// create a new user 
const createUser = new User({userName, email, password:hashedPass, address , pincode , role});
await createUser.save();


const token = jwt.sign({emailData:email,roleData:role} , process.env.TOKEN_SECRET,{
    expiresIn:"30d"
})


res.setHeader("authToken" , token)

res.status(201).json({message:"Sign Up Succesfully", createUser , token})


    } catch (error) {
        res.status(401).json({message:"something went Wrong" , error})
    }
}

export default SingUp