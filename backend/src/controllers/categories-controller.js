const express= require("express");
const router= express.Router();
const categoriesLogic= require("../bll/categories-logic");
const verifyLoggedIn = require("../middleware/verify-logged-in");


router.get("/", async (request, response)=>{
    try{
        const categories= await categoriesLogic.getCategories();
        response.send(categories);
    }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})




module.exports = router;