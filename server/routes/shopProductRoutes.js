const express = require("express");
const { getFilteredProducts }  = require("../controllers/shopProductsController");




const productRouter = express.Router()






productRouter.get("/get",getFilteredProducts)



module.exports = productRouter