const dal= require("../dal/dal");


/**
 * Get amount of orders.
 */
async function getAmountOfOrders(){
 return await dal.executeQueryAsync(`
    SELECT COUNT(*) AS quantity FROM orders 
 `)
}

/**
 * Get information about last order.
 */
async function getLastOrder(userId){
    const result= await dal.executeQueryAsync(`
    SELECT * FROM orders
    WHERE userId= ?
    ORDER BY orderDate Desc
    `, [userId]);
    return result;


}

/**
 * Post new order details. Includes saving 4 last digits of credit card.
 */
async function postNewOrder(newOrder){
    newOrder.payLastDigits= +(newOrder.creditCard.toString().substr(-4));
    delete newOrder.creditCard;
    const result= await dal.executeQueryAsync(`
    INSERT INTO orders
    VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [newOrder.userId, newOrder.cartId, newOrder.orderSum, newOrder.shipCity, 
        newOrder.shipStreet, new Date(newOrder.shipDate), new Date(newOrder.orderDate), newOrder.payLastDigits]);
    return result;
}


/**
 * Get days that has 3 or more orders.
 */
async function getBusyDates(){
    const result= await dal.executeQueryAsync(`
        SELECT shipDate FROM orders 
        GROUP by shipDate
        HAVING COUNT(shipDate)>2;
    `, []);
    return result;
}


module.exports={
    getAmountOfOrders,
    getLastOrder,
    postNewOrder,
    getBusyDates
}