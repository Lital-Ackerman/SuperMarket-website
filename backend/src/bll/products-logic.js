const dal= require("../dal/dal");

async function getAmountOfProducts(){
 return await dal.executeQueryAsync(`
    SELECT COUNT(*) AS quantity FROM products
 `)
}

async function getProductsByCategory(categoryId){
 return await dal.executeQueryAsync(`
    SELECT * FROM products
    WHERE categoryId=?
 `, [categoryId])
}

async function getProductsByProductName(productName){
 return await dal.executeQueryAsync(`
 SELECT * FROM products 
 WHERE productName LIKE '%${productName}%'
 `, [productName])
}

module.exports={
    getAmountOfProducts,
    getProductsByCategory,
    getProductsByProductName
}