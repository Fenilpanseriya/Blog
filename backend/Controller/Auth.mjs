import jwt from "jsonwebtoken";
import Person from "../model/PersonSchema.mjs";
import Blog from "../model/blogSchema.mjs";
import Detail from "../model/PersonSchema.mjs";
import { sendMail } from "./Mail.mjs";
export const registerUser=async(req,res)=>{
    const {email,password}=req.body;
    console.log(email);
    console.log(password);
    
    const token=jwt.sign({ detail:{email:email }}, "fenil1234", { algorithm: 'HS256',expiresIn:'7d' });
    const response=Detail.create({email:email,password:password})
    const items=await Detail.find();
    console.log("response is "+items);
    let emailid=email;
    let sub="Register in Blog App";
    let message=`you are successfully register with email id ${email}. thank you for Register in our Blog App.
    keep write Blog😊👍📝. if you any facing any issue contact us by sending replay of this mail.`;
    const sendingmail=await sendMail(message,emailid,sub);
    res.status(200).json({
        jwttoken:token,
        success:true
    })
}
export const loginUser=async (req,res)=>{
    const {email,password}=req.body;
    console.log(email);
    console.log(password);

    const response=Detail.find({email:email,password:password});
    if(response){
        let emailid=email;
        let sub="Login in Blog App";
        let message=`you are successfully Login with email id ${email}. thank you for Login in our Blog App.
        keep write Blog😊👍📝. if you any facing any issue contact us by sending replay of this mail.`;
        const sendingmail=await sendMail(message,emailid,sub);
        res.status(200).json({
            email:email,
            success:true
        })
        const allData=await Detail.find();
        console.log(allData)

    }
    else{
        res.status(400).json({
            message:"error in email or password",
            success:false
        })
    }
    
}

export const logoutUser=async (req,res)=>{
    const {email,password}=req.body;
    console.log(email);
    console.log(password);

    //const response=Person.find({email:email,password:password});
    const response=await Detail.deleteOne({email});
    if(response){
        res.status(200).json({
            email:"",
            success:true
        })

    }
    else{
        res.status(400).json({
            message:"error in logout",
            success:false
        })
    }
    
}

export const createPost=async(req,res)=>{
    let {image,content,title,status,userid,slug,update}=req.body;
    console.log("body is "+image);
    let blogStatus=true;
    if(status==="active"){
        blogStatus=true
    }
    else{
        blogStatus=false
    }
    status=blogStatus;
    if(update==="yes"){
        console.log("in updation")
        const response= await Blog.updateOne({title:title},{
            image,
            content,
            title,
            status,
            userid,
            slug
        });
        if(response){
            res.status(200).json({
                success:true,
                message:"updated"
            })
        }
        else{
            res.status(400).json({
                success:false,message:"post not updated"
            })
        }

    }
    else{
        console.log("in creation")
        const response= await Blog.create({
            image,
            content,
            title,
            status,
            userid,
            slug
        });
        if(response){
            res.status(200).json({
                success:true,
                message:"created"
            })
        }
        else{
            res.status(400).json({
                success:false,message:"post not created"
            })
        }

    }
    
}

export const updatePost=async(req,res)=>{
    const {image,content,title,status,userid,slug}=req.body;
    const isPresent=await Blog.find({title});
    if(!isPresent){
        createPost(req,res);
    }
    else{
        const response= await Blog.updateOne({
            image,content,title,status,userid,slug
        })
        if(response){
            res.status(200).json({
                success:true,
                message:"updated"
            })
        }
        else{
            res.status(400).json({
                success:false,message:"post not updated"
            })
        }

    }
    
}
export const getAllPosts=async(req,res)=>{
    console.log("getAllPosts called")
    const slug=req.params.id;
    console.log("slug "+slug)
    if(slug===undefined){
        const allPost=await Blog.find({status:false});
        console.log("in allpost")
        if(allPost){
            console.log(allPost)
            res.status(200).json({
                posts:allPost,
                success:true
            })
        }
        else{
            res.status(400).json({
                posts:null,
                success:false
            })
        }
    }
    else{
        const onePost=await Blog.find({slug:slug});
        if(onePost){
            console.log(onePost)
            res.status(200).json({
                posts:onePost,
                success:true
            })
        }
        else{
            res.status(400).json({
                posts:null,
                success:false
            })
        }
    }
    
    
}
export const getOnePost=async(req,res)=>{
    console.log("getonePost called")
    let slug=req.body.id;
    slug=slug.split(':')[1];
    console.log("slug "+slug)
    
    
        const onePost=await Blog.find({slug:slug});
        if(onePost){
            console.log(onePost)
            res.status(200).json({
                posts:onePost,
                success:true
            })
        }
        else{
            res.status(400).json({
                posts:null,
                success:false
            })
        }
    
    
    
}

export const deletePost=async(req,res)=>{
    console.log("deletepost called")
    let slug=req.body.id;
    console.log("curr slugis "+slug)
    
    
        const response=await Blog.deleteOne({slug:slug});
        if(response){
            const remainingPosts=await Blog.find();
            res.status(200).json({
                posts:remainingPosts,
                success:true
            })
        }
        else{
            res.status(400).json({
                posts:null,
                success:false
            })
        }
    
    
    
}
