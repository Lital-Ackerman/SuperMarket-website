const dal= require("../dal/dal");



async function getAmountOfOrders(){
 return await dal.executeQueryAsync(`
    SELECT COUNT(*) AS quantity FROM orders 
 `)
 //    WHERE isCompleted=1

}

//user last order
async function getLastOrder(userId){
    const result= await dal.executeQueryAsync(`
    SELECT * FROM orders
    WHERE userId= ?
    ORDER BY orderDate Desc
    `, [userId]);
    return result;

    //    AND isCompleted=1

}

//post new order
async function postNewOrder(newOrder){
    console.log(newOrder)
    const result= await dal.executeQueryAsync(`
    INSERT INTO orders
    VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [newOrder.userId, newOrder.cartId, newOrder.orderSum, newOrder.shipCity, 
        newOrder.shipStreet, newOrder.shipDate, newOrder.orderDate, newOrder.payLastDigits]);
    return result;
}

async function validateShipDate(shipDate){
    console.log(shipDate)
    const result= await dal.executeQueryAsync(`
    SELECT * FROM orders
    WHERE shipDate='${shipDate}'
    `, []);
    return result;
}

module.exports={
    getAmountOfOrders,
    getLastOrder,
    postNewOrder,
    validateShipDate
}