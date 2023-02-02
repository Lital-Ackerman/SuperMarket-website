const express= require("express");
const router= express.Router();
const itemsLogic= require("../bll/items-logic");

router.post("/postItem", async (request, response)=>{
    try{
        const item= request.body;
        console.log(item)
        const oldItem= await itemsLogic.isItemExist(item);
        console.log(oldItem)
        if(oldItem.length>0){
            console.log("Here")
            oldItem[0].quantity+=item.quantity;
            oldItem[0].totalPerProduct+=item.totalPerProduct;
            console.log(oldItem)
            const result= await itemsLogic.addToOldQuantityAndTotal(oldItem[0]);
            console.log(result);
        response.send(result);
        }else{
            const newItem= item;
            const result= await itemsLogic.postNewItem(newItem);
            console.log(result);
        response.send(result);
        }

        
    }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})
router.delete("/deleteItems/:cartId/:itemId", async (request, response)=>{
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