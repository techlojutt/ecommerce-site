const express = require("express");
const { addProduct, editProduct, deleteProduct, fetchAllProducts } = require("../controllers/adminProductController");




const productRouter = express.Router()



productRouter.post("/add",addProduct);

productRouter.put("/edit/:id",editProduct);

productRouter.delete("/delete/:id",deleteProduct);


productRouter.get("/get",fetchAllProducts)



module.exports = productRouter







