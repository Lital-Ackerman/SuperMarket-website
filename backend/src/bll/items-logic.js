const dal= require("../dal/dal");


//sum of last order
async function getCartSum(cartId){
   const result= await dal.executeQueryAsync(`
   SELECT SUM(totalPerProduct) as total FROM itemspercart
   WHERE cartId=?;
   `, [cartId]);
   console.log(result);
   if (result[0].total==null) return [{total: 0}]
   return result;
}

async function isItemExist(item){
   console.log("itemExist");
   console.log(item);
   const result= await dal.executeQueryAsync(`
   SELECT * FROM itemspercart
   WHERE productId=?
   AND cartId=?
   `, [item.productId, item.cartId]);
   console.log("isItemExist" +result);
   return result;
}

async function addToOldQuantityAndTotal(modifiedItem){
   console.log("modifiedItem");
   console.log(modifiedItem);
   const result= await dal.executeQueryAsync(`
   UPDATE itemspercart
   SET quantity = ?, totalPerProduct= ?
   WHERE itemId= ?
   `, [modifiedItem.quantity, modifiedItem.totalPerProduct, modifiedItem.itemId]);
   console.log(result);
   return result;
}
//   AND cartId=?


async function postNewItem(newItem){
   console.log(newItem);
   const result= await dal.executeQueryAsync(`
   INSERT into itemspercart
    VALUES (DEFAULT, ?, ?, ?, ?)
   `, [newItem.productId, newItem.quantity, newItem.totalPerProduct, newItem.cartId]);
   console.log(result);
   return result;
}

async function deleteItem(cartId, itemId){
   const deleteQuery= itemId=="all"
    ?`DELETE FROM itemspercart WHERE cartId=${cartId}`
    :`DELETE FROM itemspercart WHERE itemId=${itemId} AND cartId=${cartId}`

   const result= await dal.executeQueryAsync(deleteQuery);
   console.log(result);
   return result;
}



module.exports={
   getCartSum,
   postNewItem,
   isItemExist,
   addToOldQuantityAndTotal,
   deleteItem
}