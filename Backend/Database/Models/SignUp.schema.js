import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    address: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    role:{
      type:String,
      enum: ["user", "admin"],
      default:"user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


// ✅ Sahi tarika export karne ka
const User = mongoose.model("User", userSchema);
export default User;
