import React from 'react'
import { Outlet } from 'react-router'
import ShoppingViewHeader from '../components/ShoppingViewHeader'

function ShoppingLayout() {
  return (
    <div className='flex flex-col overflow-hidden'>
        <ShoppingViewHeader/>
        <main className='flex flex-col w-full'>
            <Outlet/>
        </main>
    </div>
  )
}

export default ShoppingLayout