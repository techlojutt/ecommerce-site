import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


const api = axios.create({
  baseURL:"http://localhost:3000" , // Base URL from environment variables
  headers: {
      "Content-Type": "application/json", // Default header for JSON requests
  },
});


export const fetchAllFilteredProducts = createAsyncThunk(
  "products/fetchProducts",
  async(_,{rejectWithValue})=>{
    try {
   

      const response = await api.get("/api/shop/products/get")

      console.log(response.data,"fetchFiltered")

      return response.data
      
    } catch (error) {
      console.log("Error:",error)
      return  rejectWithValue(
        error?.response?.data?.message || error?.message
      )
    }
  }
)



const shopProductSlice = createSlice({
    name:'shoppingProductSlice',
    initialState : {
       isLoading:false,
       products:[],

    },
    reducers:{
       
    },
    extraReducers:(builder)=>{
     builder.addCase(fetchAllFilteredProducts.pending,(state,action)=>{
        state.isLoading = true 

     })
     builder.addCase(fetchAllFilteredProducts.fulfilled,(state,action)=>{
        console.log(action.payload,"action payload")
        state.isLoading = false
        state.products = action?.payload?.data
     })
     builder.addCase(fetchAllFilteredProducts.rejected,(state,action)=>{
        state.isLoading = false
        state.products = []
     })
    }
   
})



export const {} = shopProductSlice.actions;
export default shopProductSlice.reducer