import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { logout } from '../store/auhtSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const data=useSelector(state=>state.users.status);
    const logoutHandler = () => {
        dispatch(logout())
        localStorage.setItem("status",false);
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn