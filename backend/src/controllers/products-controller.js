const express= require("express");
const router= express.Router();
const productsLogic= require("../bll/products-logic");
const path = require("path");
const fileUpload = require("express-fileupload"); 
const fs=require("fs");

router.use(fileUpload());



//Get global amount of products- for entry UI
router.get("/public", async (request, response)=>{
    try{
        const productsAmount= await productsLogic.getAmountOfProducts();
        console.log(productsAmount);
        response.send(productsAmount[0]);
    }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})

router.get("/images/:imageName", (request, response)=>{
    try{
        const imageName= request.params.imageName;
        console.log(imageName);
        let imageFile= path.join(__dirname, "../..", "images", imageName);
        if(!fs.existsSync(imageFile)) imageFile = path.join(__dirname, "../..", "images", "not-found-image.jpg");
        console.log(imageFile);

        response.sendFile(imageFile);
    }
    catch(err){
        response.status(500).send(err.message)
    }
})

router.get("/productsByCategory/:categoryId", async (request, response)=>{
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

router.get("/productsBySearch/:productName", async (request, response)=>{
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

module.exports = router;