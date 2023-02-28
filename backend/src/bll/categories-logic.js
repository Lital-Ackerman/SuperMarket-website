const dal= require("../dal/dal");


/**
 * Get categories
 */
async function getCategories(){
    const result= await dal.executeQueryAsync(`
    SELECT * FROM categories
    `);
    return result;
}


/**
 * Count number of categories, in order to limit the number of categories.
 */
async function countCategories(){
    const result= await dal.executeQueryAsync(`
    SELECT COUNT(*) AS amountCat FROM categories
    `);
    return result;
}

/**
 * Add new category
 */
async function postNewCategory(newCategoryName){
    const result= await dal.executeQueryAsync(`
    INSERT INTO categories
    VALUES (DEFAULT, ?)
    `, [newCategoryName]);
    return result;
}


module.exports={
    getCategories,
    postNewCategory,
    countCategories

}