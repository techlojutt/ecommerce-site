import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate,useLocation } from 'react-router'


function PublicRoute({children}) {


  const location = useLocation()

  console.log(location.pathname)

    const {isAuthenticated,user,isLoading} = useSelector(state=>state.auth)

   
   


   const role = user?.user?.role 

   if(isLoading){
    return <div class="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4">
    <div class="flex animate-pulse space-x-4">
      <div class="size-10 rounded-full bg-gray-200"></div>
      <div class="flex-1 space-y-6 py-1">
        <div class="h-2 rounded bg-gray-200"></div>
        <div class="space-y-3">
          <div class="grid grid-cols-3 gap-4">
            <div class="col-span-2 h-2 rounded bg-gray-200"></div>
            <div class="col-span-1 h-2 rounded bg-gray-200"></div>
          </div>
          <div class="h-2 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  </div>
   }

    
      
   if(isAuthenticated){
     return role === "admin" ? <Navigate to= "/admin/dashboard" replace /> 
     : <Navigate to= "/shop/home" replace />
   }

   return children

   
}

export default PublicRoute
