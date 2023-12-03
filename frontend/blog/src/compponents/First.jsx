import React, { useEffect } from 'react'
import {useDispatch, useSelector} from"react-redux"
import Header from './Header';
import AllPosts from '../pages/AllPosts';
import Footer from './Footer';
import Login from "./Login";
import { changeStatus, login } from '../store/auhtSlice';
const First = () => {
    const data = localStorage.getItem("status");
    const dispatch=useDispatch();
    useEffect(()=>{
        if(data){
          dispatch(login({"status":true,userData:{
              "email":localStorage.getItem("email"),
              "password":localStorage.getItem("password")
            }
          }))
        }
    },[data])
  return (
    <>
    { localStorage.getItem("email") ? <div className="min-h-screen flex flex-wrap bg-gray-400">
    <div className="w-full block">
      <Header />
      
      {localStorage.getItem("status")?<AllPosts/>:null}
      
      <Footer />
    </div>
  </div>:<Login/>
  }
  </>
  )
}

export default First
