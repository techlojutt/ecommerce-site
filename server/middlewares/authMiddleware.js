const jwt = require("jsonwebtoken")

const privateKey = process.env.JWT_PRIVATE_KEY

const authVerifyMiddleware = async(req,res,next)=>{
   try {
    // const authHeader = req.headers["authorization"]
    // const  token = authHeader && authHeader.split(" ")[1];

    const token = req?.headers?.authorization
    console.log(token,"token")

    if(!token){
      return  res.json({
           message:"Authorization is required",
           success:false
       })
    }

    var decoded = jwt.verify(token,privateKey);
    req.user = decoded

    next()
    
   } catch (error) {
       
    console.log("Error:",error)
    res.status(500).json({
        message:"Error in authMiddleware",
        success:true,
        error
    })
    
   }
}

module.exports = {
    authVerifyMiddleware
}