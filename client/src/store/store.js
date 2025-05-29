import {configureStore} from '@reduxjs/toolkit'
import authSliceReducer from './slices/authSlice'
import adminProductsSlice from './slices/adminProductSlice'
import shopProductsSlice from './slices/shopProductSlice'


export const store = configureStore({
    reducer :{
        auth:authSliceReducer,
        adminProducts:adminProductsSlice,
        shopProducts:shopProductsSlice
    }
})