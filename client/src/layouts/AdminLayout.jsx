import React,{useState} from 'react'
import { Outlet } from 'react-router'
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';


function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='flex min-h-screen w-full '>
        <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className='flex flex-1 flex-col'>
           <AdminHeader isOpen={isOpen} setIsOpen={setIsOpen} />
            <main className='bg-slate-50  p-4 md:p-6'>
               <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default AdminLayout