const dal= require("../dal/dal");


/**
 * Get sum of last order.
 */
async function getCartSum(cartId){
   const result= await dal.executeQueryAsync(`
   SELECT SUM(totalPerProduct) as total FROM itemspercart
   WHERE cartId=?;
   `, [cartId]);
   if (result[0].total==null) return [{total: 0}]
   return result;
}


/**
 * Validate if item already exist. 
 */
async function isItemExist(item){
   const result= await dal.executeQueryAsync(`
   SELECT * FROM itemspercart
   WHERE productId=?
   AND cartId=?
   `, [item.productId, item.cartId]);
   return result;
}


/**
 * If item already exist in the same cart- enlarge quantity and total.
 */
async function addToOldQuantityAndTotal(modifiedItem){
   const result= await dal.executeQueryAsync(`
   UPDATE itemspercart
   SET quantity = ?, totalPerProduct= ?
   WHERE itemId= ?
   `, [modifiedItem.quantity, modifiedItem.totalPerProduct, modifiedItem.itemId]);
   return result;
}

/**
 * Add new item
 */
async function postNewItem(newItem){
   const result= await dal.executeQueryAsync(`
   INSERT into itemspercart
    VALUES (DEFAULT, ?, ?, ?, ?)
   `, [newItem.productId, newItem.quantity, newItem.totalPerProduct, newItem.cartId]);
   return result;
}

/**
 * Delete item or all items, according to the 'itemId' parameter.
 */
async function deleteItem(cartId, itemId){
   const deleteQuery= itemId=="all"
    ?`DELETE FROM itemspercart WHERE cartId=${cartId}`
    :`DELETE FROM itemspercart WHERE itemId=${itemId} AND cartId=${cartId}`

   const result= await dal.executeQueryAsync(deleteQuery);
   return result;
}



module.exports={
   getCartSum,
   postNewItem,
   isItemExist,
   addToOldQuantityAndTotal,
   deleteItem
}