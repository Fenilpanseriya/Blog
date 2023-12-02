import React, { useEffect } from 'react'
import {useDispatch, useSelector} from"react-redux"
import Header from './Header';
import AllPosts from '../pages/AllPosts';
import Footer from './Footer';
import { changeStatus } from '../store/auhtSlice';
const First = () => {
    const data = useSelector((state) => state.users.status);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(changeStatus());
    },[data])
  return (
    <>
    { localStorage.getItem("email") ? <div className="min-h-screen flex flex-wrap bg-gray-400">
    <div className="w-full block">
      <Header />
      
      <AllPosts/>
      
      <Footer />
    </div>
  </div>:<p>hello</p>
  }
  </>
  )
}

export default First
