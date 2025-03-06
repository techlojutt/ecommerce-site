import { useEffect, useState } from 'react';
import {Routes,Route, useNavigate,Navigate} from 'react-router';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/auth/login';
import Register from './pages/auth/Register';
import './App.css'
import AdminLayout from './layouts/AdminLAyout';
import AdminDashboard from './pages/admin-view/Dashboard';
import AdminFeatures from './pages/admin-view/Features';
import AdminOrders from './pages/admin-view/Orders';
import AdminProducts from './pages/admin-view/Products';
import ShoppingLayout from './layouts/ShoppingLayout';
import Home from './pages/shopping-view/Home';
import Listing from './pages/shopping-view/Listing';
import Checkout from './pages/shopping-view/Checkout';
import Account from './pages/shopping-view/Account'
import AdminPrivateRoute from './routes/AdminPrivateRoute';
import UserPrivateRoute from './routes/UserPrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { useDispatch, useSelector } from 'react-redux';
import { tokenValidation } from './store/slices/authSlice';
import SkeletonLoader from './components/SkeletonLoader';


function App() {

  const {isLoading} = useSelector(state=>state.auth)





  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(()=>{

    dispatch(tokenValidation())
     
  },[dispatch])


  if(isLoading){
    return <SkeletonLoader/>
  }
  

  return (
   <div className='flex flex-col bg-white overflow-hidden'>

      {/* <h1>Header Component</h1> */}
      
    <Routes>
    <Route path="/" element={<Navigate to="/auth/login" />} />
      <Route  path="/auth" element={<PublicRoute><AuthLayout/></PublicRoute>}>
         <Route path="login" element={<Login/>}/>
         <Route path="register" element={<Register/>}/>
      </Route>
      <Route path="/admin" element={<AdminPrivateRoute><AdminLayout/></AdminPrivateRoute>}>
          <Route path="dashboard" element={<AdminDashboard/>}/>
          <Route path="features" element={<AdminFeatures/>}/>
          <Route path="orders" element={<AdminOrders/>}/>
          <Route path="products" element={<AdminProducts/>}/>
      </Route>
      <Route path='/shop' element={<UserPrivateRoute><ShoppingLayout/></UserPrivateRoute>}>
         <Route path='home' element={<Home/>} />
         <Route path='listing' element={<Listing/>} />
         <Route path='checkout' element={<Checkout/>} />
         <Route path='account' element={<Account/>} />
      </Route>
    </Routes>
   </div>

  )
}

export default App
