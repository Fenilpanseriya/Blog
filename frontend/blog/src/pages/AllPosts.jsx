import React, {useState, useEffect} from 'react'
import PostCard from '../compponents/Postcard'
import { useSelector } from 'react-redux'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function AllPosts() {
    const [posts, setPosts] = useState([])
    const authStatus=useSelector((state)=>state.users.status);
    const navigate=useNavigate();
    useEffect(() => {
            if(authStatus){
                const response=axios.get("http://localhost:6060/getposts").then((datas)=>{
                    setPosts(datas.data.posts)
                    return datas;
                }).catch((err)=>{
                    console.log(err);
                })
                console.log("returned data is "+response.data)
            }
    }, [navigate]);
    // appwriteService.getPosts([]).then((posts) => {
    //     if (posts) {
    //         setPosts(posts.documents)
    //     }
    // })
  return (
    <div className='w-full py-8'>
        
            <div className='flex flex-wrap'>
                {posts?.map((post) => (
                    <div key={post.id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            
    </div>
  )
}

export default AllPosts;