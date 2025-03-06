import React, {useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { loginUser } from '../../store/slices/authSlice'
import {toast} from 'react-hot-toast'

function Login() {

  const {isLoading} = useSelector(state=>state.auth)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmitLoginHandler = (e)=>{
     e.preventDefault()
     let userData = {
      email,password
     }
     dispatch(loginUser(userData)).then((data)=>{
        if(data?.payload?.success){
          toast.success(data?.payload?.message)
          console.log(data.payload.user,"userPayload")
          if(data?.payload?.user.role === "admin"){
            navigate("/admin/dashboard")
          }
          else{
            navigate("/shop/home")
          }
        }
        else{
          console.log(data?.payload?.message,"payload data")
          toast.error(data?.payload?.message || "Something went wrong while login. Please try again later.")
        }
     })
     setEmail('')
     setPassword('')

  }
  if(isLoading){
     return <h1>Loading...</h1>
  }
  return (
    <div className="flex flex-1 min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
  </div>
  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-4" action="#" method="POST" onSubmit={onSubmitLoginHandler}>
      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
        <div className="mt-2">
          <input value={email} type="email" name="email" id="email" autoComplete="email" required 
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900
           outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
           focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
           onChange={(e)=>{setEmail(e.target.value)}} />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
          <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div className="mt-2">
          <input value={password} type="password" name="password" id="password" autoComplete="current-password"
           required className="block w-full rounded-md bg-white px-3 py-1.5 text-base
            text-gray-900 outline-1 -outline-offset-1 outline-gray-300 
            placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 
            focus:outline-indigo-600 sm:text-sm/6" onChange={(e)=>{setPassword(e.target.value)}} />
        </div>
      </div>
      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>
    <p className="mt-10 text-center text-sm/6 text-gray-500">
      Don,t have an account ?
      <Link to="/auth/register" className="font-semibold text-indigo-600 hover:text-indigo-500">     Register</Link>
    </p>
  </div>
</div>
  )
}

export default Login