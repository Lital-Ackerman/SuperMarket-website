const express= require("express");
const router= express.Router();
const categoriesLogic= require("../bll/categories-logic");
const verifyAdmin = require("../middleware/verify-admin");
const verifyLoggedIn = require("../middleware/verify-logged-in");


/**
 * Get categories from DB.
 */
router.get("/", verifyLoggedIn, async (request, response)=>{
    try{
        const categories= await categoriesLogic.getCategories();
        response.send(categories);
    }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})


/**
 * Add new category to DB. Limited number of categories.
 */
router.post("/", [verifyLoggedIn, verifyAdmin], async (request, response)=>{
    try{
        const newCategoryName= request.body.newName;
        const countCategories= await categoriesLogic.countCategories();
        if (countCategories[0].amountCat>9)         
            response.status(400).send({message: "Adding Categories is not allowed. Too much categories." })
        else{
        const result= await categoriesLogic.postNewCategory(newCategoryName);
        response.status(201).send(result);
    }}
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})




module.exports = router;