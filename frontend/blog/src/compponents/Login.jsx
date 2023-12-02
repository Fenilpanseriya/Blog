import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/auhtSlice'
import Button from './Button'
import Input from './Input'
import Logo from './Logo'
import {useDispatch} from "react-redux"
import {useForm} from "react-hook-form"
import axios from "axios"
import { User } from './Datastore'
function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")
    const dataset=new Set();
    const login = async(data) => {
        setError("")
        try {
            console.log(data);
            const response=await axios.post("http://localhost:6060/login",{
                email:data.email,
                password:data.password,
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXRhaWwiOnsiZW1haWwiOiJ4eXpAZ21haWwuY29tIn0sImlhdCI6MTcwMTUxMTM2NiwiZXhwIjoxNzAyMTE2MTY2fQ.tlOT9yDHAHAUh80OQy0hq5SF54pXxnl6YsN7AzwbkHs'
                }
            },
            ).then((datas)=>{
                return datas;
            })
            console.log("returned email is "+response.data.email)
            if(response.data){
                localStorage.setItem("email",data.email);
                dispatch(authLogin(data))
                navigate("/");
            }
            
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full h-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login