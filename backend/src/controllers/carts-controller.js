const express= require("express");
const router= express.Router();
const cartsLogic= require("../bll/carts-logic");
const ordersLogic= require("../bll/orders-logic");
const itemsLogic= require("../bll/items-logic");
const usersLogic= require("../bll/users-logic");
const Cart = require("../models/cart");

router.get("/orderStatus/:userId", async (request, response)=>{
    try{
        const userId= request.params.userId;
        const openCart= await cartsLogic.getOpenCart(userId);
        if(openCart.length>0) {
            console.log(openCart[0].cartId)
            const openCartTotal= await itemsLogic.getCartSum(openCart[0].cartId);
            console.log("openCartTotal");
            console.log(openCartTotal);
            openCart[0].total= openCartTotal[0].total
            response.send({resType: 1, data: openCart[0]})
        }
        else{
            const lastOrder= await ordersLogic.getLastOrder(userId);
            console.log(lastOrder)
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

router.post("/", async (request, response)=>{
    try{
        const userId= request.body.userId;
        const newCart= new Cart(userId)
        const cartAdded= await cartsLogic.openNewCart(newCart);
        console.log(cartAdded.insertId);
        response.send({cartId: cartAdded.insertId});
    }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})

// router.get("/openCart/:userId", async (request, response)=>{
//     try{
//         const userId= +request.params.userId;
//         console.log(userId)
//         const carts= await cartsLogic.getOpenCart(userId);
//         console.log(carts[0].cartId);
//         const cartId= carts[0].cartId;
//         response.send(cartId)
//         if(carts) {
//             const cartContent= await cartsLogic.getCartInfo(carts[0].cartId);
//             console.log(cartContent)
//             response.send(cartContent)
//         }
//     }
//     catch(err){
//         console.log(err);
//         response.status(500).send({message: "No Data Available. Server Error"})
//     }
// })

router.get("/cartContent/:cartId", async (request, response)=>{
    try{
        const cartId= +request.params.cartId;
        console.log(cartId)
        const cartContent= await cartsLogic.getCartInfo(cartId);
        console.log(cartContent)
        // if(carts) {
        //     const cartContent= await cartsLogic.getCartInfo(carts[0].cartId);
        //     console.log(cartContent)
        response.send(cartContent)
        // }
    }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})

module.exports = router;