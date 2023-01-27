const express= require("express");
const router= express.Router();
const itemsLogic= require("../bll/items-logic");

router.post("/postItem", async (request, response)=>{
    try{
        const newItem= request.body;
        const result= await itemsLogic.postNewItem(newItem);
        console.log(result);
        response.send(result);
    }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})

module.exports = router;