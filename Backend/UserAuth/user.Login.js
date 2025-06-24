import User from "../Database/Models/SignUp.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const LoginValid = async (req, res) => {
  try {
    const { email, password , role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userFound = await User.findOne({ email })

    if (!userFound) {
      return res.status(404).json({ message: "User not found. Please sign up first." });
    }



    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }




    const jwtToken = jwt.sign({emailData:email , roleData:role },process.env.TOKEN_SECRET,{
        expiresIn: "30d"
    })

    res.setHeader("authToken" , jwtToken)

    const { password: removed, ...userData } = userFound._doc;

    // ✅ All good — login successful
    res.status(200).json({ message: "Login successfully", user: userData })
 


  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export default LoginValid;
