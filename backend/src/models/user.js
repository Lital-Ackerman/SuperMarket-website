const bll= require("../bll/users-logic");
const Joi= require("joi");

const patterns= {
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
    userId: /^\d{9}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  }

const regexUser= new RegExp(patterns.email)
const regexPass= new RegExp(patterns.password)

class User{
    constructor(user){
            this.firstName=user.firstName;
            this.lastName= user.lastName;
            this.userId= user.userId;
            this.username= user.username;
            this.password= user.password;
            this.city= user.city;
            this.street= user.street;
            this.role= 0;
    }

     async validateDouble(){
        let isExist= await bll.getAlreadyRegister(this.username);
        if (isExist.length>0)
        return "Username is already exist";
        else return null
    }

    static #validateSchema= Joi.object({
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
        userId: Joi.number().required(),
        username: Joi.string().min(6).max(30).required().custom((value, helper)=>{
            if(!regexUser.test(value)) return helper.message('Invalid Email address')}),
        password: Joi.string().min(8).max(30).required().custom((value, helper)=>{
            if(!regexPass.test(value)) return helper.message('Invalid Password')}),
        city: Joi.string().required().min(2).max(20),
        street: Joi.string().required().min(2).max(20),
        role: Joi.number().integer().allow()
    })

    validate(){
        const result= User.#validateSchema.validate(this, {abortEarly: false});
        return result.error ? result.error.details.map(err => err.message) : null;
    }
}

module.exports= User;