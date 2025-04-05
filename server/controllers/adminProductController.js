const Product = require("../models/productModel")



// add a product 

const addProduct = async(req,res)=>{
 const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salesPrice,
    totalStock
 } = req?.body

 try {

    const newlyCreatedProduct = new Product({
        image,
        title,
        description,
        category,
        brand,
        price,
        salesPrice,
        totalStock
    })

    const product =  await newlyCreatedProduct.save()

    res.status(201).json({
        data:product,
        success:true,
        message:"Product added successfully",
    })
    
 } catch (error) {
    console.log("Error:",error)

    res.status(500).json({
        message:"Error occured",
        success:false,
        error
    })
 }
}


//fetch all products

const fetchAllProducts = async(req,res)=>{
    
   
    try {

        const listOfProducts = await Product.find()
   
       res.status(201).json({
           data:listOfProducts,
           success:true,
           message:"Products fetched successfully",
       })
       
    } catch (error) {
       console.log("Error:",error)
   
       res.status(500).json({
           message:"Error occured",
           success:false,
           error
       })
    }
   }

//edit a product

const editProduct = async(req,res)=>{
    
    const {id} = req?.params
    const {
        image,
        title,
        description,
        category,
        brand,
        price,
        salesPrice,
        totalStock
    } = req?.body
    
   
    try {

        const findProduct = await Product.findOneAndUpdate({_id:id},{
            $set:{
                image,
                title,
                description,
                category,
                brand,
                price,
                salesPrice,
                totalStock
            }
        })
        if(!findProduct){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }
   
       res.status(200).json({
           data:findProduct,
           success:true,
           message:"Product updated successfully",
       })
       
    } catch (error) {
       console.log("Error:",error)
   
       res.status(500).json({
           message:"Error occured",
           success:false,
           error
       })
    }
   }

//delete a product


const deleteProduct = async(req,res)=>{

    
   
    const {id} = req?.params
    console.log(id,"id in delete product")
   
    try {

        const deletedProduct = await Product.findByIdAndDelete(id)
        if(!deletedProduct){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }
     
       res.status(200).json({
           data:deletedProduct,
           success:true,
           message:"Product deleted successfully",
       })
       
    } catch (error) {
       console.log("Error:",error)
   
       res.status(500).json({
           message:"Error occured",
           success:false,
           error
       })
    }
   }



 module.exports = {
   addProduct,
   fetchAllProducts,
   editProduct,
   deleteProduct
}