const dal= require("../dal/dal");
const jwt= require("jsonwebtoken");
const config= require("../config.json");


async function getCategories(userId){
    const result= await dal.executeQueryAsync(`
    SELECT * FROM categories
    `);
    console.log(result)
    return result;
}

async function postNewCategory(newCategoryName){
    const result= await dal.executeQueryAsync(`
    INSERT INTO categories
    VALUES (DEFAULT, ?)
    `, [newCategoryName]);
    console.log(result)
    return result;
}



module.exports={
    getCategories,
    postNewCategory

}