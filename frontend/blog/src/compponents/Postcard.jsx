import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'

function PostCard({userid, title, image,slug}) {
    console.log(userid,title,image)
    const deletePost=(e)=>{

    }
    
  return (
    <Link to={`/posts/:${slug}`}>
        <div className='w-full bg-gray-300 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                {/* <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' /> */}
                <img src="images/1.jpg"alt={title}
                 className='rounded-xl' />
                
                

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
            
            
        </div>
    </Link>
  )
}


export default PostCard