const express= require("express");
const router= express.Router();
const ordersLogic= require("../bll/orders-logic");
const cartsLogic= require("../bll/carts-logic");

//Get global amount of orders- for entry UI
router.get("/public/ordersAmount", async (request, response)=>{
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

router.post("/newOrder", async (request, response)=>{
    try{
        const newOrder= request.body;
        const openCartResult= await ordersLogic.postNewOrder(newOrder);
        const completeCartItems= await cartsLogic.completeCart(newOrder.cartId);
        console.log(openCartResult);
        console.log(completeCartItems);
        newOrder.orderId= openCartResult.insertIdl
        response.send(newOrder);
    }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})

router.get("/validateShipDate/:shipDate", async (request, response)=>{
    try{
        const shipDate= request.params.shipDate;
        const ordersInDate= await ordersLogic.validateShipDate(shipDate);
        response.send(ordersInDate);
    }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})

module.exports = router;