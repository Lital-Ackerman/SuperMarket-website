const dal= require("../dal/dal");
const path=require("path");


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

async function postNewProduct(newProduct, imageFile){
   console.log(imageFile)
const absolutePath= path.join(__dirname, "../..", "images", imageFile.name);
await imageFile.mv(absolutePath);
console.log(absolutePath);
 return await dal.executeQueryAsync(`
 INSERT INTO products 
 VALUES (DEFAULT, ?, ?, ?, ?)
 `, [newProduct.productName, newProduct.categoryId, newProduct.price, imageFile.name])
}

async function editProduct(modifiedProduct, imageFile){
   console.log(modifiedProduct)
   console.log(imageFile)
const absolutePath= path.join(__dirname, "../..", "images", imageFile.name);
await imageFile.mv(absolutePath);
console.log(absolutePath);
 return await dal.executeQueryAsync(`
 UPDATE products 
 SET productName=?,
 categoryId=?,
 price=?,
 image=?
 WHERE productId=?
 `, [modifiedProduct.productName, modifiedProduct.categoryId, modifiedProduct.price, imageFile.name, modifiedProduct.productId])
}

module.exports={
    getAmountOfProducts,
    getProductsByCategory,
    getProductsByProductName,
    postNewProduct,
    editProduct
}