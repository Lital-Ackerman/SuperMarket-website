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



module.exports={
    getCategories

}