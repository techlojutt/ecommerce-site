import React from 'react'
import { Outlet } from 'react-router'
import ShoppingViewHeader from '../components/ShoppingViewHeader'

function ShoppingLayout() {
  return (
    <div className='flex flex-col bg-red-300 overflow-hidden'>
        <ShoppingViewHeader/>
        <main className='flex flex-col w-full bg-green-300'>
            <Outlet/>
        </main>
    </div>
  )
}

export default ShoppingLayout