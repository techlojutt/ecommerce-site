const Product = require("../models/productModel")




const getFilteredProducts = async(req,res)=>{
   try {

    const products = await Product.find()

   



    res.status(200).json({
         data:products,
         status:true,
         message:""
    }
    )
    
   } catch (error) {
      console.log(error)
      res.status(500).json({
        status:false,
        message:"Some error occured"
      })
   }
}



module.exports = {
    getFilteredProducts
}