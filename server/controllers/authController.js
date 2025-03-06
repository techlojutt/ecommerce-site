const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const privateKey = process.env.JWT_PRIVATE_KEY


const registerController = async(req,res)=>{

    const {userName,email,password} = req?.body
     
    try {
        if(!userName){
         return res.send({
            message:"User Name is required"
        })
            
        }

        if(!email){
           return res.send({
                message:"email is required"
            })
        }
        if(!password){
           return res.send({
                message:"password is required"
            })
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.json({

                success:false,
                message:"User already exists with the same email! Please try again"
            }
            )
        }

        var hashPassword = bcrypt.hashSync(password, 8);
        let newUser = new User({
            userName,
            email,
            password:hashPassword
        })

        const result = await newUser.save();

        res.status(200).json({
            user:result,
            success:true,
            message:'User registered successfully'
        })
        
    } catch (error) {
        res.status(500).json({
            data:[],
            success:false,
            message:"Error in Registering User",
            error:error,
        })
        
    }
}


const loginController = async(req,res)=>{ 
    console.log(req.body)
    const {email,password} = req?.body
    console.log(email,password)
    try {

        const checkUser = await User.findOne({email})
        console.log(checkUser)
        if(!checkUser){
            return res.json({
               success:false, 
               message:"User doesn't exists! Please register first"
            })
        }

        console.log(checkUser.password)

     const checkPassword = bcrypt.compareSync(password,checkUser.password);
     
    console.log(checkPassword,"check")
     if(!checkPassword){
        return res.json({
            success:false,
            message:"Invalid password! Please try again"
        })
     }


     const token = jwt.sign({
         id:checkUser._id,
         userName:checkUser.userName,
         email:checkUser.email,
         role:checkUser.role
     },privateKey)

     let message ;

     if(checkUser.role === "admin"){
          message = "Admin logged in successfully"
     }
     else{
        message = "User logged in successfully "
     }


        res.status(200).json({
            user:{
              token,
              id:checkUser._id,
              email:checkUser.email,
              role:checkUser.role,
              userName:checkUser.userName
            },
            success:true,
            message:message
        })

    } catch (error) {
        res.status(500).json({
            data:[],
            success:false,
            message:"Error in Logging In User",
            error,
        })
        
    }
}

const authVerifyController = async(req,res)=>{
    const userId  = req.user.id
    console.log(userId,"userId")
 try {
    
    let user = await User.findById(userId) 
    console.log(user)
    user = {
       userName:user.userName,
       email:user.email,
       id:user._id,
       role:user.role,
    }

    res.status(200).json({
      user:user,
      message:"Token is Valid",
      success:true,
    })
    
 } catch (error) {
    console.log("Error:",error.message)
    res.status(500).json({
       data:[],
       message:"Error in Token Validation",
       success:false,
       error
    })
    
 }
}


module.exports = {
    registerController,
    loginController,
    authVerifyController
}


