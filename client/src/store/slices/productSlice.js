import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL:"http://localhost:3000" , // Base URL from environment variables
  headers: {
      "Content-Type": "application/json", // Default header for JSON requests
  },
});


export const addNewProduct = createAsyncThunk(
  "products/addnewproduct",
  async(formData,{rejectWithValue})=>{
    try {
      console.log(formData, "form data in async thunk")

      const response = await api.post("/api/admin/products/add",formData)

      console.log(response.data)

      return response.data
      
    } catch (error) {
      console.log("Error:",error)
      return  rejectWithValue(
        error?.response?.data?.message || error?.message
      )
    }
   
  }

)


export const fetchProducts = createAsyncThunk(
  "products/addnewproduct",
  async(_,{rejectWithValue})=>{
    try {
      console.log(formData, "form data in async thunk")

      const response = await api.get("/api/admin/products/get")

      console.log(response.data)

      return response.data
      
    } catch (error) {
      console.log("Error:",error)
      return  rejectWithValue(
        error?.response?.data?.message || error?.message
      )
    }
   
  }

)




export const productSlice = createSlice({
    name:"adminProductSlice",
    initialState:{
        product:[],
        isLoading:false,
        error:null

    },
    reducers:{
      setProduct:()=>{

      }
    },
    extraReducers:(builder)=>{

      builder.addCase(addNewProduct.pending,(state,action)=>{
        state.isLoading = true;
        state.error = null
      })

      builder.addCase(addNewProduct.fulfilled,(state,action)=>{
        console.log(action.payload,"Action payload")
        state.isLoading = false
        state.product = [...state.product,action.payload.data];

      })

      builder.addCase(addNewProduct.rejected,(state,action)=>{
        state.isLoading = false;
        if(action.payload){
        state.error = action.payload.message
      } else{
        state.error = action.error?.message || "Something went wrong!";
      }
      })
    }
})


export const {setProduct} = productSlice.actions
export default productSlice.reducer