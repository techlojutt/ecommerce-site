import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"




const api = axios.create({
    baseURL:"http://localhost:3000" , // Base URL from environment variables
    headers: {
        "Content-Type": "application/json", // Default header for JSON requests
    },
});



export const registerUser = createAsyncThunk(
    "auth/register",
    async(formData,{ rejectWithValue })=>{
        console.log(formData,"formData")
         
        try {

           const response = await api.post("/api/auth/register",formData)
           console.log(response.data.message)

           return response.data
            
        } catch (error) {

            console.log("Error:",error)

            return rejectWithValue(
                error?.response?.data?.message || error?.message
            )
            
        }
    }
    
)

export const loginUser = createAsyncThunk(
    "auth/login",
    async(formData,{ rejectWithValue })=>{
        console.log(formData,"formData")
         
        try {

           const response = await api.post("/api/auth/login",formData)
           console.log(response.data.message)

           const token = response?.data?.user?.token
           
         
           localStorage.setItem("token",token)
           return response.data
            
        } catch (error) {

            console.log("Error:",error)

            return rejectWithValue(
                error?.response?.data?.message || error?.message
            )
            
        }
    }
    
)

export const tokenValidation = createAsyncThunk(
    "auth/validateToken",
    async(_,{ rejectWithValue })=>{

       
        const token = localStorage.getItem("token")
       
        try {
          


           const response = await axios.get("http://localhost:3000/api/auth/tokenValidation",{
            headers:{
              Authorization :token
            }
           })
           console.log(response.data)
           return response.data
            
        } catch (error) {

            console.log("Error:",error)

            return rejectWithValue(
                error?.response?.data?.message || error?.message
            )
            
        }
    }
    
)




const authSlice = createSlice({
    name:"auth",
    initialState:{
        user : null ,
        isAuthenticated : false,
        isLoading : true,
        error:null,
        token: localStorage.getItem("token") || null,
    },
    reducers:{
        logout:(state,action)=>{
           state.isAuthenticated = false
           state.user = null
           state.token = null
           localStorage.removeItem("token")
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state,action)=>{
             state.isLoading = true
             state.error = null
        }
        )
        builder.addCase(registerUser.fulfilled,(state,action)=>{

            state.user = action.payload
            state.isLoading = false
        }
        )
        builder.addCase(registerUser.rejected,(state,action)=>{
             state.error = action.payload
             state.isLoading = false,
             state.isAuthenticated = false
        }
        )
        builder.addCase(loginUser.pending,(state,action)=>{
            state.isLoading = true
            state.error = null
            state.isAuthenticated =false
       }
       )
       builder.addCase(loginUser.fulfilled,(state,action)=>{
            console.log(action.payload,"action payload")
           state.user = action.payload.success?action.payload:null
           state.isLoading = false,
           state.isAuthenticated = action?.payload?.success
       }
       )
       builder.addCase(loginUser.rejected,(state,action)=>{
            console.log(action.payload,"action payload")
            state.error = action.payload
            state.isLoading = false,
            state.isAuthenticated = false
       }
       )
       builder.addCase(tokenValidation.pending,(state,action)=>{
          state.isLoading = true
          state.error = null
       }
   )
      builder.addCase(tokenValidation.fulfilled,(state,action)=>{
          console.log(action.payload,"action payload in builder ")
          state.user = action?.payload?.success?action.payload:null
          state.isLoading = false,
          state.isAuthenticated = action?.payload?.success
   }
   )
   builder.addCase(tokenValidation.rejected,(state,action)=>{
        state.error = action.payload
        state.isLoading = false,
        state.isAuthenticated = false
   }
   )
    }



})




export const {logout} = authSlice.actions
export default authSlice.reducer