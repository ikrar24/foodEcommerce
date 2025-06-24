import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const connectDb = async ()=>{
    try {
        
await mongoose.connect(process.env.MONGO_URI)

console.log("Mongo DB Is Conneted");
    } catch (error) {
        console.log("Connetion Is Failed", error);
    }
}

export default connectDb