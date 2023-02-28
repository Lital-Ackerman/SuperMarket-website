const dal= require("../dal/dal");
const path=require("path");

/**
 * Get amount of products
 */
async function getAmountOfProducts(){
 return await dal.executeQueryAsync(`
    SELECT COUNT(*) AS quantity FROM products
 `)
}

/**
 * Get products by category
 */
async function getProductsByCategory(categoryId){
 return await dal.executeQueryAsync(`
    SELECT * FROM products
    WHERE categoryId=?
 `, [categoryId])
}

/**
 * Get products that contains the user search text.
 */
async function getProductsByProductName(productName){
 return await dal.executeQueryAsync(`
 SELECT * FROM products 
 WHERE productName LIKE '%${productName}%'
 `, [productName])
}

/**
 * Get products by the exact name, in order to prevent double names.
 */
async function getProductsByExactProductName(productName){
 return await dal.executeQueryAsync(`
 SELECT * FROM products 
 WHERE productName= ?
 `, [productName])
}

/**
 * Post new product details.
 */
async function postNewProduct(newProduct, imageFile){
   let imageName;
   if(imageFile){
      const absolutePath= path.join(__dirname, "../..", "images", imageFile.name)
      await imageFile.mv(absolutePath);
      imageName= imageFile.name
   }else{
      imageName= "NULL"
   }
   return await dal.executeQueryAsync(`
   INSERT INTO products 
   VALUES (DEFAULT, ?, ?, ?, ?)
   `, [newProduct.productName, newProduct.categoryId, newProduct.price, imageName])
   }


/**
 * Edit product by update modified details.
 */
async function editProduct(modifiedProduct, imageFile){
   let imageName;
   if(imageFile){
      const absolutePath= path.join(__dirname, "../..", "images", imageFile.name);
      await imageFile.mv(absolutePath);
      imageName= imageFile.name
   }else{
      imageName= "NULL"
   }
   return await dal.executeQueryAsync(`
   UPDATE products 
   SET productName=?,
   categoryId=?,
   price=?,
   image=?
   WHERE productId=?
   `, [modifiedProduct.productName, modifiedProduct.categoryId, modifiedProduct.price, imageName, modifiedProduct.productId])
   }

   
module.exports={
    getAmountOfProducts,
    getProductsByCategory,
    getProductsByProductName,
    getProductsByExactProductName,
    postNewProduct,
    editProduct
}