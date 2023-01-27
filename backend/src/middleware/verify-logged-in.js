const { response } = require("express");
const jwt= require("jsonwebtoken");
const config= require("../config.json");
const expressJwt = require('express-jwt');
const fs = require('fs');


//Some actions are allowed only for users

// function verifyLoggedIn(){
//     const RSA_PUBLIC_KEY = fs.readFileSync('./demos/public.key');

//     expressJwt({
//         secret: RSA_PUBLIC_KEY
//         // algorithms: ["HS256"]

//     })
// }
function verifyLoggedIn(request, response, next){
    // const notLogMessage={message:"You are not logged in"};
    if(!request.headers.authorization)
        return response.status(401).send({message: "a"});

        const token= request.headers.authorization?.split(" ")[1];
        console.log("!token");
        if(!token) return response.status(401).send({message: "b"});

        jwt.verify(token, config.jwtKey, (err, decodedToken)=>{
            console.log("token11");

            if(err){
                if(err.message=="jwt expired"){
                    console.log("exp");

                return response.status(403).send({message: "Your login session has expired"});
                }
                return response.status(401).send({message: "c"})
            }
            else{
                request.user= decodedToken.user;
                console.log("***")
                console.log(request.user)
                next();
            }
        })
}

module.exports= verifyLoggedIn;