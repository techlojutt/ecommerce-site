import {configureStore} from '@reduxjs/toolkit'
import authSliceReducer from './slices/authSlice'
import adminProductsSlice from './slices/productSlice'


export const store = configureStore({
    reducer :{
        auth:authSliceReducer,
        adminProducts:adminProductsSlice
    }
})