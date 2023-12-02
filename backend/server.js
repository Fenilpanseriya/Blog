import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from"dotenv"
import Blog from "./model/blogSchema.mjs";
import { validToken } from "./middleware/Valid.mjs";
import { registerUser,loginUser, createPost, updatePost, logoutUser, getAllPosts,getOnePost, deletePost} from "./Controller/Auth.mjs";
const app=express()

const options={
    "origin":"http://localhost:3000"
}
//app.options("*",cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();
app.listen(process.env.PORT,()=>{
    console.log("sever conneted successfully on port 6060")
})



mongoose.connect(process.env.MONGO_URI,
    {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(()=>{console.log("connected with Person")}).catch(err=>{
        console.log("error is"+err);
}).then(()=>console.log("first person connected"))

mongoose.connect(process.env.MONGO_URI,{
  dbName: process.env.DB_NAME2,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>console.log("connected with blogs"))
app.post("/register",registerUser);
app.post("/login",validToken,loginUser);
app.post("/logout",logoutUser);
app.post("/createPost",createPost);
app.post("/updatePost",updatePost);
app.get(`/getposts`,getAllPosts);
app.post("/getpost",getOnePost);
app.post("/deletepost",deletePost);