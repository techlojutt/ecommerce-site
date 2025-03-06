import React from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { MdLogout } from "react-icons/md";
import {useDispatch} from "react-redux"
import { logout } from '../store/slices/authSlice';


function AdminHeader({setIsOpen}) {


  const dispatch = useDispatch()
   
  return (
    <header className=' flex justify-between items-center px-4 py-3 border-b '>
     <button onClick={()=>setIsOpen(true)} className='lg:hidden sm:block py-2 px-2 me-1 mb-1 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'>
        <RxHamburgerMenu size={25}  />
        <span className="sr-only">Toggle menu</span>
     </button>
     <div className='flex flex-1  justify-end items-center'>
     <button onClick={()=>dispatch(logout())} type="button" className= "inline-flex gap-2 items-center shadow cursor-pointer text-white bg-gray-800 hover:bg-gray-900 
       focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm 
       px-4 py-2 me-1 mb-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700
       dark:border-gray-700">
      <MdLogout size={25}/>
       Logout
     </button>
     </div>
     </header>
  )
}

export default AdminHeader