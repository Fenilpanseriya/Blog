import React, {useEffect, useState} from 'react'
import Postform from '../compponents/PostForm/Postform';
import { useNavigate,  useParams } from 'react-router-dom';
import axios from  "axios";
function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            const response=axios.get("http://localhost:6060/getPost/:slug").then((post)=>{
                setPosts(post);
            }).catch((err)=>{
                setPosts("")
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        
            <Postform post={post} />
        
    </div>
  ) : null
}

export default EditPost