const dal= require("../dal/dal");


//sum of last order
async function getCartSum(cartId){
   const result= await dal.executeQueryAsync(`
   SELECT SUM(totalPerProduct) as total FROM itemspercart
   WHERE cartId=?;
   `, [cartId]);
   console.log(result);
   return result;
}

async function postNewItem(newItem){
   console.log(newItem);
   const result= await dal.executeQueryAsync(`
   INSERT into itemspercart
    VALUES (DEFAULT, ?, ?, ?, ?)
   `, [newItem.productId, newItem.quantity, newItem.totalPerProduct, newItem.cartId]);
   console.log(result);
   return result;
}

module.exports={
   getCartSum,
   postNewItem
}