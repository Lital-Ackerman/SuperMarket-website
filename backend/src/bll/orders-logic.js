const dal= require("../dal/dal");



async function getAmountOfOrders(){
 return await dal.executeQueryAsync(`
    SELECT COUNT(*) AS quantity FROM orders 
    WHERE isCompleted=1
 `)
}

//user last order
async function getLastOrder(userId){
    const result= await dal.executeQueryAsync(`
    SELECT * FROM orders
    WHERE userId= ?
    AND isCompleted=1
    ORDER BY orderDate Desc
    `, [userId]);
    return result;
}

module.exports={
    getAmountOfOrders,
    getLastOrder
}