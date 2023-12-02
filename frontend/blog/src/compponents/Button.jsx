import React from "react";
import {useSelector} from "react-redux"
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    slug,
    ...props
}) {
    const authStatus=useSelector((state)=>state.users.status);
    const [posts, setPosts] = useState([])
    const navigate=useNavigate();
    const deletepost=(e)=>{
        if(authStatus){
            const response=axios.post("http://localhost:6060/deletepost",{
                id:slug
            }).then((datas)=>{
                console.log("data is "+JSON.stringify(datas.data.posts))
                setPosts((datas.data.posts))
                navigate("/")
                return datas.data;
            }).catch((err)=>{
                console.log(err);
            })
           
        }

    }
    return (
        <button onClick={deletepost} className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}
