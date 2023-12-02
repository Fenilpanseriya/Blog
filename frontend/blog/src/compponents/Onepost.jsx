import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux'
import axios from "axios"
import Postform from './PostForm/Postform';
const Onepost = () => {
    const {slug}=useParams();
    console.log("slug is "+slug)
    const [posts, setPosts] = useState([])
    const authStatus=useSelector((state)=>state.users.status);
    
    useEffect(() => {
            if(authStatus){
                const response=axios.post("http://localhost:6060/getpost",{
                    id:slug
                }).then((datas)=>{
                    // datas.data.posts.forEach((ele)=>console.log("ele is "+ele))
                    console.log(datas.data.posts[0].content)
                    console.log("data is "+JSON.stringify(datas.data.posts))
                    setPosts((datas.data.posts))
                    return datas;
                }).catch((err)=>{
                    console.log(err);
                })
               
            }
    }, [])
  return (
    <div>
      <p>{
        slug 
      }</p>
      {
        posts?.map((post)=>{
            
            return <div>
                <Postform {...post}content={post.content} title={post.title} slug={post.slug} status={post.status}/>
                
            </div>
        })
      }
    </div>
  )
}

export default Onepost
