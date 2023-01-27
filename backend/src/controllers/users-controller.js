const express= require("express");
const router= express.Router();
const usersLogic= require("../bll/users-logic");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const Credentials = require("../models/credentials");
const User = require("../models/user");

//Login Process
router.post("/public/login", async (request, response)=>{
    try{
        const credentials= new Credentials(request.body);
        const errors= credentials.validate();
        if(errors) return response.status(400).send({message: errors});

        const loggedInUser= await usersLogic.postLoginUser(credentials);
        console.log(loggedInUser)
        loggedInUser
            ?response.send(loggedInUser)
            :response.status(404).send({message: `Incorrect username or password`})
    }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})


router.get("/public/idValidation/:id", async (request, response)=>{
    try{
        const userId= request.params.id;
        let isIdExist= await usersLogic.isIdExist(userId);
        if(isIdExist){
            response.send(isIdExist)
        }else{
            response.send(null)
        }
    }
    catch(err){
        console.log(err);
        response.status(500).send(err);

    }
})

router.get("/public/usernameValidation/:username", async (request, response)=>{
    try{
        const username= request.params.username;
        let isUsernameExist= await usersLogic.getAlreadyRegister(username);
        console.log(isUsernameExist)
        if(isUsernameExist){
            response.send(isUsernameExist)
        }else{
            response.send(null)
        }
    }
    catch(err){
        console.log(err);
        response.status(500).send(err);

    }
})

router.post("/public/register", async (request, response)=>{
    try{
        const newUser= new User(request.body);
        let isExist= await newUser.validateDouble();
        if (isExist){
            response.status(400).send(isExist);
        }
        else{
            const result= await usersLogic.postNewUser(newUser);
            response.send(result);
        }
    }
    catch(err){
        console.log(err);
        response.status(500).send(err);

    }
})




module.exports = router;