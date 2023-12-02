import mongoose from "mongoose"
const detailSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    }
})
const Detail=mongoose.model("Detail",detailSchema);
export default Detail;