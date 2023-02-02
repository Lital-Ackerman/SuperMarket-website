const dal= require("../dal/dal");

//does user have open Cart
async function getOpenCart(userId){
    const result= await dal.executeQueryAsync(`
    SELECT * FROM carts
    WHERE userId= ?
    AND isCompleted=0
    ORDER BY cartDate Desc
    `, [userId]);
    return result;
}

async function openNewCart(newCart){
 return await dal.executeQueryAsync(`
    INSERT into carts
    VALUES (DEFAULT, ?, ?, DEFAULT)
 `, [newCart.userId, newCart.cartDate])
}

async function completeCart(cartId){
    const result= await dal.executeQueryAsync(`
    UPDATE carts 
    SET isCompleted=1
    WHERE cartId=?
    `, [cartId]);
    console.log(result);
    return result;
 }

async function getCartInfo(cartId){
 return await dal.executeQueryAsync(`
 SELECT products.productName, products.productId, products.price, itemspercart.itemId, itemspercart.quantity, products.price*itemspercart.quantity as totalPerProduct, itemspercart.cartId 
 FROM products INNER JOIN itemspercart 
 ON products.productId= itemspercart.productId 
 AND itemspercart.cartId= ? 
 ORDER BY itemspercart.itemId`, [cartId])
}

module.exports={
    openNewCart,
    getCartInfo,
    getOpenCart,
    completeCart
}