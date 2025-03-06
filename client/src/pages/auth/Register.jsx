import React, { useState } from 'react'
import { Link } from 'react-router'
import {useDispatch} from 'react-redux'
import { registerUser } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router';
import {toast} from 'react-hot-toast';


function Register() {
  const [userName,setUserName]  = useState("");
  const [email,setEmail]  = useState("");
  const [password,setPassword] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onClickSubmitHandler = (e)=>{
     e.preventDefault()
  
    let userData = {
      userName,
      email,
      password
    }
    console.log(userData,"userData")
    dispatch(registerUser(userData)).then((data)=>{
      if(data?.payload?.success){
        toast.success(data?.payload?.message)

       navigate("/auth/login")
      }
     else{
       toast.error(data?.payload?.message || "Something went wrong while registering. Please try again later.")
     }
    })
     
   

    setUserName("")
    setEmail("")
    setPassword("")

    
   
  }

  return (
    <div className="flex flex-1 min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create new account</h2>
  </div>
  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-4"   onSubmit={onClickSubmitHandler}>
    <div>
        <label htmlFor="userName" className="block text-sm/6 font-medium text-gray-900">User Name</label>
        <div className="mt-2">
          <input value={userName} type="text" name="name" id="name" autoComplete="name"
           required className="block w-full rounded-md bg-white px-3 py-1.5 
           text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300  
           placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2
          focus:outline-indigo-600 sm:text-sm/6" onChange={(e)=>setUserName(e.target.value)} />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
        <div className="mt-2">
          <input value={email} type="email" name="email" id="email" autoComplete="email" required className="block w-full rounded-md
           bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300
            placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2
             focus:outline-indigo-600 sm:text-sm/6" onChange={(e)=>setEmail(e.target.value)} />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
        </div>
        <div className="mt-2">
          <input value={password} type="password" name="password" id="password" autoComplete="current-password" required 
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 
          outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2
           focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" onChange={(e)=>setPassword(e.target.value)} />
        </div>
      </div>
      <div>
        <button type="submit" className="flex w-full justify-center 
        rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold
         text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2
          focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
      </div>
    </form>
    <p className="mt-10 text-center text-sm/6 text-gray-500">
      Already have an account ?
      <Link to="/auth/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Login</Link>
    </p>
  </div>
 </div>
  )
}

export default Register