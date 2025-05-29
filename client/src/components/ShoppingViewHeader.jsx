import React, { useEffect, useRef, useState } from 'react';
import { LuHousePlug, LuLogOut, LuUserCog } from "react-icons/lu";
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";
import { FiLogOut, FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { shoppingViewHeaderMenuItems } from '../constants/constants';
import { logout } from '../store/slices/authSlice';

function MenuItems(){

  return (
    <nav className='flex flex-col mb-3 md:mb-0 md:items-center gap-6 md:flex-row '>
    {
      shoppingViewHeaderMenuItems.map(item=>{
        return <Link className='text-sm font-medium' key={item.id} to={item.path}>{item.label}</Link>
      })
    }
    </nav>
  )
}


function HeaderRightContent(){
    const dropDownRef = useRef(null)
    const {user,isAuthenticated} = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    console.log(user.user.userName,"userName")
    const [open,setOpen] = useState(false)
    const toggleDropdown = ()=>setOpen(!open)
    const onClose = ()=>setOpen(false)

    const onCLickLogout = ()=>{
         dispatch(logout())
    }

    useEffect(()=>{
      const handleClickOutside = (event)=>{
         if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
           onClose()
         }
        }
         if(open){
          document.addEventListener("mousedown",handleClickOutside)
         }
         return()=>{
           document.removeEventListener("mousedown",handleClickOutside)
         }
      
    },[open])

  return <div className='flex md:items-center md:flex-row flex-col gap-5 '>
    <button className='outline-1 outline-gray-100 p-2 rounded cursor-pointer hover:bg-gray-100 '>
       <FiShoppingCart className='w-6 h-6'/>
    </button>
    <div className="relative inline-block text-left">
  <div>
    
<div class="relative w-11 h-11 cursor-pointer overflow-hidden bg-black text-xl rounded-full dark:bg-gray-600 font-bold  flex items-center justify-center text-white" 
onClick={toggleDropdown}>
    {user.user.userName[0].toUpperCase()}
</div>

    
  
  </div>
  {/*
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
From: "transform opacity-0 scale-95"
To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
From: "transform opacity-100 scale-100"
To: "transform opacity-0 scale-95"
  */}
 {open&&<div ref={dropDownRef}
  className="absolute right-0 z-100 mt-2 w-56 origin-top-right   rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
    
      <div className='py-2 px-4 text-xs text-gray-500 font-semibold'>
       Logged in as {user?.user?.userName}
      </div>
      <div className='divide-y divide-gray-100'>
      <div className='px-4 py-2 text-gray-500 font-semibold flex gap-2 items-center hover:bg-gray-200'>
        <LuUserCog className='w-6 h-6'/>
        <div className='text-sm font-light'>Account</div>
      </div>
   

    <div className="px-4 py-2 flex cursor-pointer text-gray-500 gap-2 hover:bg-gray-200 rounded-b" role="none"
    onClick={onCLickLogout}>
      {/* Active: "bg-gray-100 text-gray-900 outline-hidden", Not Active: "text-gray-700" */}
     <FiLogOut className='w-6 h-6'/>
     <div className='text-sm font-light'>Logout</div>
    </div>
    </div>
    
  </div>}
</div>

  </div>
}

function ShoppingViewHeader() {
  const [isOpen,setIsOpen] = useState(false)
  const {user,isAuthenticated} = useSelector(state=>state.auth)
  console.log(user,"user")
  const toggleDrawer = ()=>{
    setIsOpen(!isOpen)
  }
  const closeDrawer = ()=>{
    setIsOpen(false)
  }
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-white'>
        <div className='flex h-16 items-center justify-between px-4 md:px-6 '>
          <Link to="/shop/home" className='flex gap-2 items-center '>
            <LuHousePlug className='h-6 w-6'/>
            <span className='font-bold'>Ecommerce</span>
           </Link>
           
       

     <div>
      {/* 🌐 Hamburger Menu Button */}
      <button className='md:hidden outline-2 p-1 rounded
       outline-gray-100 cursor-pointer hover:bg-gray-100'
       onClick={toggleDrawer}>
          <RxHamburgerMenu className='h-6 w-6 '/>
      </button> 
     </div>

         <>
      {/* Drawer Toggle Button */}
     
      {/* Overlay */}
{isOpen && (
  <div
    className="fixed inset-0 z-40 transition-opacity duration-300 transparent-overlay"
    onClick={toggleDrawer}>
  </div>
)}
      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 z-40 h-screen p-4  overflow-y-auto transition-transform bg-white w-74 dark:bg-gray-800 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <h5 className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
          Menu
        </h5>

        {/* Close Button */}
        <button
          type="button"
          onClick={closeDrawer}
          className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 flex items-center justify-center"
        >
          <svg
            className="w-3 h-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
<div className='flex flex-col'>
    <div className="py-4 overflow-y-auto">
          <MenuItems/>
        </div>
        <div className='pt-1 border-t'>
          <HeaderRightContent/>
        </div>
</div>
        {/* Drawer Content */}
      
      </div>
    </>
 


        
        

        <div className='hidden md:block'>
         <MenuItems/>   
        </div>
          <div
          className='hidden md:block'>
           <HeaderRightContent/>
          </div>
        </div>

    </header>
  )
}

export default ShoppingViewHeader