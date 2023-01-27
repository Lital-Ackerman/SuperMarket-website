const express= require("express");
const router= express.Router();
const ordersLogic= require("../bll/orders-logic");

//Get global amount of orders- for entry UI
router.get("/public", async (request, response)=>{
    try{
        const ordersAmount= await ordersLogic.getAmountOfOrders();
        console.log(ordersAmount);
        response.send(ordersAmount[0]);
    }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})

module.exports = router;