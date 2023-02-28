const express= require("express");
const router= express.Router();
const ordersLogic= require("../bll/orders-logic");
const cartsLogic= require("../bll/carts-logic");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const Order= require("../models/order");

/**
 * Get information about number of orders.
 */
router.get("/public/ordersAmount", async (request, response)=>{
    try{
        const ordersAmount= await ordersLogic.getAmountOfOrders();
        response.send(ordersAmount[0]);
    }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})

/**
 * Add new order to DB. Inckudes validation.
 */
router.post("/newOrder", verifyLoggedIn, async (request, response)=>{
    try{
        const newOrder= new Order(request.body);
        const error= newOrder.validate();
        if(error){
            response.status(400).send({message: error});
        }else{
        const openCartResult= await ordersLogic.postNewOrder(newOrder);
        const completeCartItems= await cartsLogic.completeCart(newOrder.cartId);
        newOrder.orderId= openCartResult.insertId;
        response.status(201).send(newOrder);
    }}
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})


/**
 * Get information about days with 3 or more orders.
 */
router.get("/busyDates", verifyLoggedIn,  async (request, response)=>{
    try{
        const busyDates= await ordersLogic.getBusyDates();
        response.send(busyDates);
    }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})


module.exports = router;