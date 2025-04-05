import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL:"http://localhost:3000" , // Base URL from environment variables
  headers: {
      "Content-Type": "application/json", // Default header for JSON requests
  },
});


export const updateProducts = createAsyncThunk(
  "products/updateProduct",
  async(updatedFormData,{rejectWithValue})=>{
        try {
          console.log(updatedFormData,"updated form data in async thunk")
          
          const productId = updatedFormData.id;
          const updatedProduct = updatedFormData
          delete updatedFormData.id
          const response = await api.put(`/api/admin/products/edit/${productId}`,
            updatedFormData
          )

          return updatedProduct
          
        } catch (error) {
          console.log(error)
          return rejectWithValue(
            error?.response?.data?.message || error?.message
          )
        }
  }
)

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
   async(productId,{rejectWithValue})=>{
        try {
            console.log(productId,"deleted product id")
            const response = await api.delete(`/api/admin/products/delete/${productId}`)
           
            return productId
          
        } catch (error) {
          console.log(error)
          return rejectWithValue(
            error?.response?.data?.message || error?.message
          )
        }
  }
)
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
  "products/fetchProducts",
  async(_,{rejectWithValue})=>{
    try {
   

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
        products:[],
        isLoading:false,
        error:null,
        updateProduct:null

    },
    reducers:{
      updateProduct:(state,action)=>{
        console.log(action.payload,"action payload in update product")
        let updateProductById = state.products.find((product)=>product._id === action.payload)
        state.updateProduct = updateProductById
      },
      resetupdateProductId:(state,action)=>{
        state.updateProduct = null
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
        state.products = [action.payload,...state.products]

      })

      builder.addCase(addNewProduct.rejected,(state,action)=>{
        state.isLoading = false;
        if(action.payload){
        state.error = action.payload.message
      } else{
        state.error = action.error?.message || "Something went wrong!";
      }
      })

      
     builder.addCase(fetchProducts.pending,(state,action)=>{
      state.isLoading = true;
      state.error = null
     })
     builder.addCase(fetchProducts.fulfilled,(state,action)=>{
      console.log(action.payload.data,"action payload in fetch case")
      state.isLoading = false;
      state.products = action.payload.data
     
     })
     builder.addCase(fetchProducts.rejected,(state,action)=>{
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload.message
      }
      else{
        state.error = action.error?.message || "Something went wrong!";
      }
      
     })
      
     builder.addCase(deleteProduct.pending,(state,action)=>{
          state.isLoading  = true
     })

     builder.addCase(deleteProduct.fulfilled,(state,action)=>{
          console.log(action.payload,"action in payload in delete product")
           state.isLoading = false
           state.products = state.products.filter((product)=>{
             return product._id !== action.payload
           })
     })

     builder.addCase(deleteProduct.rejected,(state,action)=>{
             state.isLoading = false 
             if (action.payload) {
              state.error = action.payload.message
            }
            else{
              state.error = action.error?.message || "Something went wrong!";
            }
            
     })

     builder.addCase(updateProducts.pending,(state,action)=>{
      state.isLoading  = true
      state.error = null
 })
     builder.addCase(updateProducts.fulfilled,(state,action)=>{
          console.log(action.payload,"action payload in fulfilled update")
          const updatedProduct = action.payload
          state.isLoading = false
          
          state.products = state.products.map((product)=>{
               if(product._id === action.payload.id ){
                  return {
                    ...product,
                    ...updatedProduct
                  }
               }
               return product
          })
     })
     builder.addCase(updateProducts.rejected,(state,action)=>{
      state.isLoading = false 
      if (action.payload) {
       state.error = action.payload.message
     }
     else{
       state.error = action.error?.message || "Something went wrong!";
     }
     
})
    }
})


export const {updateProduct,resetupdateProductId} = productSlice.actions
export default productSlice.reducer