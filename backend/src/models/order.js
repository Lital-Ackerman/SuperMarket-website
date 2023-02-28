const Joi= require("joi");
const regexAllTypes= /(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\d{3})\d{11}$)/
const regex= new RegExp(regexAllTypes)

class Order{
    constructor(order){
        this.userId=order.userId;
        this.cartId= order.cartId;
        this.orderSum= order.orderSum;
        this.shipCity= order.shipCity;
        this.shipStreet= order.shipStreet;
        this.shipDate= order.shipDate;
        this.orderDate= order.orderDate;
        this.creditCard= order.creditCard;
    }
   
    // static validateCredit(){
    //     if(regex.test(this.creditCard)) return this.creditCard
    //     else throw new Error('Invalid credic card number') 
    // }
    

        
    
    static #validateSchema= Joi.object({
        userId: Joi.number().required(),
        cartId: Joi.number().required(),
        orderSum: Joi.number(),
        shipCity: Joi.string().min(2).max(20).required(),
        shipStreet: Joi.string().min(2).max(20).required(),
        shipDate: Joi.date().required(),
        orderDate: Joi.date().required(),
        creditCard: Joi.number().integer().positive().required().custom((value, helper)=>{
            if(!regex.test(value)) return helper.message('Invalid credit card number')
        })
    })

    validate(){
        const result= Order.#validateSchema.validate(this, {abortEarly: false});
        return result.error ? result.error.details.map(err => err.message) : null;

    }
}

module.exports= Order;