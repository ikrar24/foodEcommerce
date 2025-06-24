import express from "express";
import connectdb from "./Database/db.connetion.js";
import dotenv from "dotenv";
import cors from "cors";
import SingUp from "./UserAuth/user.SignUp.js";
import cookieParser from "cookie-parser";
import userLogin from "./UserAuth/user.Login.js";
import {
  GetAllProducts,
  SaveAllProduct,
  UpdateProducts,
  DeleteProducts,
} from "./Database/SaveToMongoDb/AllProductSave.js";
import {
  getFamousData,
  SaveFamousProduct,
  deleteFamousData,
} from "./Database/SaveToMongoDb/FamousDataSave.js";
// mongodb File import and then call hare
connectdb();

// configer .env File
dotenv.config();

// create a app varivable of express for create server and api
const app = express();

// use express.json() method midileware for sending json format and url encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// tepmprory allwed all ip adress calling data using cros
app.use(cors());

// cookie parser middileware
app.use(cookieParser());


// create port
const port = process.env.PORT || 3000;
app.use(express.static("public"));



// products crud Routes
app.get("/", GetAllProducts);
app.post("/postproduct", SaveAllProduct);
app.put("/updateproduct:id", UpdateProducts);
app.delete("/deleteproduct:id", DeleteProducts);



// famouse items can't update only can delete
app.get("/famousproduct", getFamousData);
app.delete("/deletefamousproduct", deleteFamousData);




// user auth route
app.post("/signup", SingUp);
app.post("/login", userLogin);



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
