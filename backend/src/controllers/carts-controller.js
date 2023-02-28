const express= require("express");
const router= express.Router();
const cartsLogic= require("../bll/carts-logic");
const ordersLogic= require("../bll/orders-logic");
const itemsLogic= require("../bll/items-logic");
const Cart = require("../models/cart");
const verifyLoggedIn = require("../middleware/verify-logged-in");


/**
 * Get information about open cart/last order.
 */
router.get("/orderStatus/:userId", verifyLoggedIn, async (request, response)=>{
    try{
        const userId= request.params.userId;
        const openCart= await cartsLogic.getOpenCart(userId);
        if(openCart.length>0) {
            const openCartTotal= await itemsLogic.getCartSum(openCart[0].cartId);
            openCart[0].total= openCartTotal[0].total
            response.send({resType: 1, data: openCart[0]})
        }
        else{
            const lastOrder= await ordersLogic.getLastOrder(userId);
            lastOrder.length>0
            ? response.send({resType: 2, data: lastOrder[0]})
            : response.send({resType: 3, data: "first Order"})
        }
    }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})


/**
 * Open new cart
 */
router.post("/", verifyLoggedIn, async (request, response)=>{
    try{
        const userId= request.body.userId;
        const newCart= new Cart(userId)
        const cartAdded= await cartsLogic.openNewCart(newCart);
        response.send({cartId: cartAdded.insertId});
    }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})


/**
 * Get cart information
 */
router.get("/cartContent/:cartId", verifyLoggedIn, async (request, response)=>{
    try{
        const cartId= +request.params.cartId;
        const cartContent= await cartsLogic.getCartInfo(cartId);
        response.send(cartContent)
        
    }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})


module.exports = router;