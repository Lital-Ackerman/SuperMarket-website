const express= require("express");
const router= express.Router();
const productsLogic= require("../bll/products-logic");
const path = require("path");
const fileUpload = require("express-fileupload"); 
const fs=require("fs");
const Product = require("../models/product");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const verifyAdmin = require("../middleware/verify-admin");
router.use(fileUpload());


/**
 * Get global amount of products- for entry UI
 */

router.get("/public", async (request, response)=>{
    try{
        const productsAmount= await productsLogic.getAmountOfProducts();
        response.send(productsAmount[0]);
    }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})

/**
 * Get Product image for cards.
 */
router.get("/images/:imageName", (request, response)=>{
    try{
        const imageName= request.params.imageName;
        let imageFile= path.join(__dirname, "../..", "images", imageName);
        if(!fs.existsSync(imageFile)) imageFile = path.join(__dirname, "../..", "images", "not-found-image.jpg");
        response.sendFile(imageFile);
    }
    catch(err){
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})

/**
 * Get Products information according to user selected category.
 */
router.get("/productsByCategory/:categoryId", verifyLoggedIn, async (request, response)=>{
    try{
        const categoryId= request.params.categoryId
        const products= await productsLogic.getProductsByCategory(categoryId);
        response.send(products);
    }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})

/**
 * Get Products information according to user search.
 */
router.get("/productsBySearch/:productName", verifyLoggedIn, async (request, response)=>{
    try{
        const productName= request.params.productName;
        const products= await productsLogic.getProductsByProductName(productName);
        response.send(products);
    }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})

/**
 * Add new product to DB. Includes validation details and if name already exist. 
 * Admin action only.
 */
router.post("/postNewProduct", [verifyLoggedIn, verifyAdmin], async (request, response)=>{
    try{
        const newProduct= new Product(request.body);
        const error= newProduct.validate();
        if(error)
            response.status(400).send({message: error});
        else{
            const isExist= await productsLogic.getProductsByExactProductName(newProduct.productName);
            if(isExist.length==0){
                const result= await productsLogic.postNewProduct(newProduct, request.files ? request.files.imageFile : null);
                newProduct.productId= result.insertId;
                response.status(201).send(newProduct);
            }else{
                response.status(400).send({message: 'Product Name is already Exist'})
            }}
    }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})

/**
 * Edit product. Includes validation details and if name already exist at another product. 
 *  * Admin action only.
 */
router.put("/editProduct", [verifyLoggedIn, verifyAdmin], async (request, response)=>{
    try{
        const modifiedProduct= new Product(request.body);
        const error= modifiedProduct.validate();
        if(error)
            response.status(400).send({message:error});
        else{
            const isExist= await productsLogic.getProductsByExactProductName(modifiedProduct.productName);
            if(isExist.length==0 ||isExist.length==1 && isExist[0].productId==modifiedProduct.productId){
                const result= await productsLogic.editProduct(modifiedProduct, request.files ? request.files.imageFile : null);
                response.send(result);
            }else{
                response.status(400).send({message: 'Product Name is already Exist'})
            }
    }}
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})

module.exports = router;