import React from 'react';
import { SiGoogleanalytics } from "react-icons/si";
import { useNavigate } from 'react-router';
import { TbLayoutDashboard } from "react-icons/tb";
import { FaShoppingBasket } from "react-icons/fa";
import { FaFirstOrder } from "react-icons/fa6";
import { useState } from "react";
import {  MdClose } from "react-icons/md";

const adminSideBarMenuItems = [
  {
      id:'dashboard',
      label:'Dashboard',
      path:'/admin/dashboard',
      icon:<TbLayoutDashboard size={25}/>
  },
  {
      id:'products',
      label:'Products',
      path:'/admin/products',
      icon:<FaShoppingBasket size={25}/>
  },
  {
      id:'orders',
      label:'Orders',
      path:'/admin/orders',
      icon:<FaFirstOrder size={25}/>
  },

]

const AdminPanel = () => {
  

  // Toggle the sidebar
  

  return (
    <>
      {/* Hamburger Button */}

      {/* Overlay (Click to Close) */}
      
    </>
  );
}

function MenuItems({isOpen,setIsOpen}){
  const navigate = useNavigate()
  return(
    <nav className='mt-8 flex-col flex gap-2  '>
     {
      adminSideBarMenuItems.map(menuItem=><div key={menuItem.id} onClick={()=>{
        navigate(menuItem.path)
        isOpen?setIsOpen(false):null
      }
      }
      className='text-xl flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer bg-gray-0 hover:bg-gray-100 text-gray-700 '>
        {menuItem.icon}
      <span>{menuItem.label}</span>
      </div>)
     }
    </nav>
  )
}



function AdminSidebar({isOpen,setIsOpen}) {
  const navigate = useNavigate()
  const togglePanel =()=>{
    setIsOpen(!isOpen)
  }
  return (
    <>
     {/* Overlay with Transparent Background */}
  {isOpen && (
    <div
      className={`fixed inset-0 z-40 transition-opacity duration-300 transparent-overlay`}
      onClick={togglePanel}
    ></div>
  )}

  {/* Sidebar Panel */}
  <div
    className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 transform ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } transition-transform duration-300`}
  >
    {/* Panel Header */}
    <div className="flex items-center justify-between p-4 border-b">
      <SiGoogleanalytics size={30} />
      <h2 className="text-xl font-extrabold">Admin Panel</h2>
      <button onClick={togglePanel} className="text-gray-600  rounded-2xl hover:bg-gray-200 cursor-pointer ">
        <MdClose size={25} />
      </button>
    </div>

    {/* Sidebar Menu Items */}
    <MenuItems isOpen={isOpen} setIsOpen={setIsOpen}  />
  </div>
    <aside className='bg-white hidden w-64 flex-col border-r p-6 lg:flex'>
     <div onClick={()=>navigate("/admin/dashboard")} className=' cursor-pointer flex items-center gap-3'>
        <SiGoogleanalytics size={30} />
        <h1 className='text-2xl font-extrabold'>Admin Panel </h1>
     </div>
     <MenuItems/>
    </aside>
    </>
  )
}

export default AdminSidebar