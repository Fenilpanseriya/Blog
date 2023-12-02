import mongoose from "mongoose";
const blogSchema=mongoose.Schema({
    image:{
        type:String,
        unique:true,
        required:true
    },
    content:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true,
        unique:false
    },
    status:{
        type:Boolean,
        required:true,
    },
    userid:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
    }
})

const Blog=mongoose.model("Blog",blogSchema);
export default Blog;
