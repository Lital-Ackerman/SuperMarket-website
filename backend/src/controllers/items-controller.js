const express= require("express");
const router= express.Router();
const itemsLogic= require("../bll/items-logic");
const verifyLoggedIn = require("../middleware/verify-logged-in");


/**
 * Add new Item to cart. If item exist- enlarge the amount in receiept.
 */
router.post("/postItem", verifyLoggedIn, async (request, response)=>{
    try{
        const item= request.body;
        const oldItem= await itemsLogic.isItemExist(item);
        if(oldItem.length>0){
            oldItem[0].quantity+=item.quantity;
            oldItem[0].totalPerProduct+=item.totalPerProduct;
            const result= await itemsLogic.addToOldQuantityAndTotal(oldItem[0]);
            response.send(result);
        }else{
            const newItem= item;
            const result= await itemsLogic.postNewItem(newItem);
            response.send(result);
        }
    }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})

/**
 * Delete item from cart.
 */
router.delete("/deleteItems/:cartId/:itemId", verifyLoggedIn, async (request, response)=>{
    try{
        const cartId= request.params.cartId;
        const itemId= request.params.itemId;
        const result= await itemsLogic.deleteItem(cartId, itemId);
        response.send(result);
        }        
    
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})


module.exports = router;