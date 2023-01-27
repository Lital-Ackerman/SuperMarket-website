const dal= require("../dal/dal");
const jwt= require("jsonwebtoken");
const config= require("../config.json");

//does user is login + generate token
async function postLoginUser(userInfo){
    const user= await dal.executeQueryAsync(`
    SELECT * FROM users
    WHERE userName=? AND password=?
 `, [userInfo.username, userInfo.password])

if(!user || user.length<1) return null;
delete user[0].password;

user[0].token = jwt.sign({user: user[0]}, config.jwtKey, {expiresIn: "1 minutes"});
console.log(user);
return user[0];
}

async function getAlreadyRegister(username){
    const result= await dal.executeQueryAsync(`
    SELECT * FROM users
    WHERE username=?;
    `, [username]);
    console.log(result);
    return result;
}

async function isIdExist(userId){
    const result= await dal.executeQueryAsync(`
    SELECT * FROM users
    WHERE userId=?;
    `,[userId]) ;
     console.log(result);
    return result;
}

async function postNewUser(newUser){
    const result= await dal.executeQueryAsync(`
    INSERT into users
    VALUES (?,?,?,?,?,?,?, DEFAULT)
    `, [newUser.firstName, newUser.lastName, newUser.userId, newUser.username, newUser.password, newUser.city, newUser.street]);
    console.log(result);
    return result;
}



module.exports={
    postLoginUser,
    getAlreadyRegister,
    isIdExist,
    postNewUser

}