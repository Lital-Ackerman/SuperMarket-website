const express= require("express");
const router= express.Router();
const usersLogic= require("../bll/users-logic");
const Credentials = require("../models/credentials");
const User = require("../models/user");
const jwt = require("jsonwebtoken");


/**
 * Validate if Token is valid in order to implement autoLogin
 */
router.post("/public/autoLogin", async (request, response)=>{
    try{
        const lastUserToken= request.body.lastUserToken;
        let lastUserData= jwt.decode(lastUserToken);
        const expiryToken= new Date(0);
        expiryToken.setUTCSeconds(lastUserData.exp);

            if(expiryToken>new Date())
                response.send(lastUserData.user)
            else
                response.send({message: "Invalid Token"})
        }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }})


/**
 * Login Process. includes validating user credentials.
 */
router.post("/public/login", async (request, response)=>{
    try{
        const credentials= new Credentials(request.body);
        const errors= credentials.validate();
        if(errors) 
            return response.status(400).send({message: errors});
        const loggedInUser= await usersLogic.postLoginUser(credentials);
        loggedInUser
            ?response.send(loggedInUser)
            :response.status(404).send({message: `Incorrect username or password. Try again.`})
    }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"})
    }
})

/**
 * Validating if user ID already exist during Registration.
 */
router.get("/public/idValidation/:id", async (request, response)=>{
    try{
        const userId= request.params.id;
        let isIdExist= await usersLogic.isIdExist(userId);
        response.send(isIdExist)
    }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"});
    }
})

/**
 * Validating if username already exist during Registration form.
 */
router.get("/public/usernameValidation/:username", async (request, response)=>{
    try{
        const username= request.params.username;
        let isUsernameExist= await usersLogic.getAlreadyRegister(username);
        if(isUsernameExist)
            response.send(isUsernameExist)
        else
            response.send(null)
    }
    catch(err){
        console.log(err);
        response.status(500).send({message: "No Data Available. Server Error"});

    }
})

/**
 * Registration process. includes validation.
 */
router.post("/public/register", async (request, response)=>{
    try{
        const newUser= new User(request.body);
        const error= newUser.validate();
        if(error)
            response.status(400).send({message:error})
        else{
        let isExist= await newUser.validateDouble();
        if (isExist){
            response.status(400).send(isExist);
        }
        else{
            const result= await usersLogic.postNewUser(newUser);
            response.status(201).send(result);
        }}}
    catch(err){
        console.log(err);
        response.status(500).send({message: "Server Error"});

    }
})




module.exports = router;